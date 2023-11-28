package graph

import (
	"fmt"
	"io"
	"skewax/graph/model"
	"sort"
	"strings"

	"golang.org/x/sync/errgroup"
	"google.golang.org/api/drive/v3"
)

func IsPBasic(file *drive.File) bool {
	return strings.HasSuffix(file.Name, ".pbasic")
}

func DownloadFile(srv *drive.Service, id string) (*string, error) {
	download, err := srv.Files.Get(id).Download()
	if err != nil {
		return nil, err
	}
	defer download.Body.Close()

	content, err := io.ReadAll(download.Body)
	if err != nil {
		return nil, err
	}

	str := string(content)
	return &str, nil
}

func GetFile(srv *drive.Service, id string, fields []string) (*model.File, error) {

	infoChan := make(chan *model.File)
	contentsChan := make(chan *string)

	go func() {
		if GetContainsField(fields, "contents") {
			contents, err := DownloadFile(srv, id)
			if err != nil {
				contentsChan <- nil
			}
			contentsChan <- contents
		} else {
			contentsChan <- nil
		}
	}()

	go func() {

		fileQuery, err := srv.Files.Get(id).Do()
		if err != nil {
			infoChan <- nil
			return
		}
		fileObj := model.File{
			ID:        fileQuery.Id,
			Name:      fileQuery.Name,
			CreatedAt: fileQuery.CreatedTime,
			UpdatedAt: fileQuery.ModifiedTime,
			// Writable:  fileQuery.Capabilities.CanEdit,
			IsPbasic: IsPBasic(fileQuery),
		}
		infoChan <- &fileObj
	}()

	info := <-infoChan
	if info == nil {
		return nil, fmt.Errorf("Failed to get file info")
	}
	if GetContainsField(fields, "contents") {
		contents := <-contentsChan
		if contents == nil {
			return nil, fmt.Errorf("Failed to get file contents")
		}
		info.Contents = *contents
	}
	return info, nil
}

func getDirectoryInfo(srv *drive.Service, id string) (*model.Directory, error) {
	baseDirQuery, err := srv.Files.Get(id).Do()
	if err != nil {
		return nil, err
	}
	return &model.Directory{
		ID:        baseDirQuery.Id,
		Name:      baseDirQuery.Name,
		CreatedAt: baseDirQuery.CreatedTime,
		UpdatedAt: baseDirQuery.ModifiedTime,
	}, err
}

func GetDirectory(srv *drive.Service, id string, fields []string) (*model.Directory, error) {
	infoChan := make(chan *model.Directory)
	filesChan := make(chan []*model.File)
	directoriesChan := make(chan []*model.Directory)

	go func() {
		info, err := getDirectoryInfo(srv, id)
		if err != nil {
			infoChan <- nil
		}
		infoChan <- info
	}()

	go func() {
		filesQuery, err := srv.Files.List().Q(
			fmt.Sprintf("'%s' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false",
				id,
			)).Do()
		if err != nil {
			filesChan <- nil
		}

		fileFields := GetNestedFields(fields, "files")

		if !GetContainsField(fileFields, "contents") {
			files := make([]*model.File, len(filesQuery.Files))
			for i, file := range filesQuery.Files {
				files[i] = &model.File{
					ID:        file.Id,
					Name:      file.Name,
					CreatedAt: file.CreatedTime,
					UpdatedAt: file.ModifiedTime,
					// Writable:  file.Capabilities.CanEdit,
					IsPbasic: IsPBasic(file),
				}
			}
			filesChan <- files
			return
		}

		fileQueryChan := make(chan *model.File, len(filesQuery.Files))

		filesWg := new(errgroup.Group)

		for _, file := range filesQuery.Files {
			fileInstance := file
			filesWg.Go(func() error {
				content, err := DownloadFile(srv, fileInstance.Id)
				if err != nil {
					return err
				}
				fileQueryChan <- &model.File{
					ID:        fileInstance.Id,
					Name:      fileInstance.Name,
					CreatedAt: fileInstance.CreatedTime,
					UpdatedAt: fileInstance.ModifiedTime,
					// Writable:  fileInstance.Capabilities.CanEdit,
					IsPbasic: IsPBasic(fileInstance),
					Contents: *content,
				}
				return nil
			})
		}

		if err := filesWg.Wait(); err != nil {
			filesChan <- nil
		}

		files := make([]*model.File, len(filesQuery.Files))
		for i := 0; i < len(filesQuery.Files); i++ {
			files[i] = <-fileQueryChan
		}
		sort.Slice(files, func(i, j int) bool {
			return files[i].Name < files[j].Name
		})
		filesChan <- files

	}()

	go func() {
		subDirsQuery, err := srv.Files.List().Q(
			fmt.Sprintf("'%s' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
				id,
			)).Do()
		if err != nil {
			filesChan <- nil
			return
		}

		directoriesQueryChan := make(chan *model.Directory, len(subDirsQuery.Files))

		directoriesWg := new(errgroup.Group)

		for _, dir := range subDirsQuery.Files {
			dirInstance := dir
			directoriesWg.Go(func() error {
				directory, err := getDirectoryInfo(srv, dirInstance.Id)
				if err != nil {
					return err
				}
				directoriesQueryChan <- directory
				return nil
			})
		}

		if err := directoriesWg.Wait(); err != nil {
			directoriesChan <- nil
			return
		}

		directories := make([]*model.Directory, len(subDirsQuery.Files))
		for i := 0; i < len(subDirsQuery.Files); i++ {
			directories[i] = <-directoriesQueryChan
		}
		sort.Slice(directories, func(i, j int) bool {
			return directories[i].Name < directories[j].Name
		})

		directoriesChan <- directories

	}()

	info := <-infoChan
	files := <-filesChan
	directories := <-directoriesChan
	if info == nil {
		return nil, fmt.Errorf("Failed to get directory info")
	}
	if files == nil {
		return nil, fmt.Errorf("Failed to get directory files")
	}
	if directories == nil {
		return nil, fmt.Errorf("Failed to get directory subdirectories")
	}

	info.Files = files
	info.Directories = directories
	return info, nil

}
