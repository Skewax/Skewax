package graph

import (
	"fmt"
	"io"
	"skewax/graph/model"
	"strings"

	"google.golang.org/api/drive/v3"
)

func GetDirectory(srv *drive.Service, id string, fields []string) (*model.Directory, error) {
	baseDirQuery, err := srv.Files.Get(id).Do()
	if err != nil {
		return nil, err
	}

	filesQuery, err := srv.Files.List().Q(
		fmt.Sprintf("'%s' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false",
			id,
		)).Do()
	if err != nil {
		return nil, err
	}

	files := make([]*model.File, 0)

	fileFields := GetNestedFields(fields, "files")

	for _, file := range filesQuery.Files {
		pbasic := strings.HasSuffix(file.Name, ".pbasic")
		fileObj := model.File{
			ID:        file.Id,
			Name:      file.Name,
			CreatedAt: file.CreatedTime,
			UpdatedAt: file.ModifiedTime,
			IsPbasic:  pbasic,
			// Writable:  file.Capabilities.CanEdit,
		}
		if GetContainsField(fileFields, "contents") {
			download, err := srv.Files.Get(file.Id).Download()
			if err != nil {
				return nil, err
			}
			defer download.Body.Close()
			content, err := io.ReadAll(download.Body)
			if err != nil {
				return nil, err
			}
			fileObj.Contents = string(content)
		}
		files = append(files, &fileObj)
	}

	subDirFields := GetNestedFields(fields, "directories")

	subDirsQuery, err := srv.Files.List().Q(
		fmt.Sprintf("'%s' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
			id,
		)).Do()

	directories := make([]*model.Directory, 0)
	for _, subDir := range subDirsQuery.Files {
		directory, err := GetDirectory(srv, subDir.Id, subDirFields)
		if err != nil {
			return nil, err
		}
		directories = append(directories, directory)
	}

	return &model.Directory{
		ID:          id,
		Name:        baseDirQuery.Name,
		CreatedAt:   baseDirQuery.CreatedTime,
		UpdatedAt:   baseDirQuery.ModifiedTime,
		Files:       files,
		Directories: directories,
	}, nil

}
