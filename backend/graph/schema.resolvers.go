package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"fmt"
	"skewax/graph/model"
	"strings"

	drive "google.golang.org/api/drive/v3"
)

// CreateFile is the resolver for the createFile field.
func (r *mutationResolver) CreateFile(ctx context.Context, args model.FileCreate) (*model.File, error) {
	// Get services
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	driveSrv, err := r.Google.DriveService(token)
	if err != nil {
		return nil, err
	}

	newFile, err := driveSrv.Files.Create(&drive.File{
		Name:     args.Name,
		MimeType: "text/plain",
	}).Media(strings.NewReader(args.Contents)).Do()
	if err != nil {
		return nil, err
	}

	pbasic := IsPBasic(newFile)
	return &model.File{
		ID:        newFile.Id,
		Name:      args.Name,
		Contents:  args.Contents,
		CreatedAt: newFile.CreatedTime,
		UpdatedAt: newFile.ModifiedTime,
		IsPbasic:  pbasic,
	}, nil
}

// UpdateFile is the resolver for the updateFile field.
func (r *mutationResolver) UpdateFile(ctx context.Context, id string, args model.FileUpdate) (*model.File, error) {
	// Get services
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	driveSrv, err := r.Google.DriveService(token)
	if err != nil {
		return nil, err
	}

	existingFile, err := driveSrv.Files.Get(id).Do()
	if err != nil {
		return nil, err
	}

	// Build update call
	fileReq := drive.File{
		MimeType: "text/plain",
	}

	if args.Name != nil {
		fileReq.Name = existingFile.Name
	}

	updateCall := driveSrv.Files.Update(id, &fileReq)

	if args.Contents != nil {
		updateCall = updateCall.Media(strings.NewReader(*args.Contents))
	}

	// Execute update call
	newFile, err := updateCall.Do()
	if err != nil {
		return nil, err
	}

	// Collect output
	pbasic := IsPBasic(newFile)
	outFile := &model.File{
		ID:        id,
		Name:      newFile.Name,
		CreatedAt: newFile.CreatedTime,
		UpdatedAt: newFile.ModifiedTime,
		IsPbasic:  pbasic,
		// Writable:  newFile.Capabilities.CanEdit,
		// TODO: this should be better later
	}

	// Download contents if not found and not provided
	preloads := GetPreloads(ctx)

	if args.Contents != nil {
		if GetContainsField(preloads, "contents") {
			contents, err := DownloadFile(driveSrv, id)
			if err != nil {
				return nil, err
			}

			outFile.Contents = *contents
		}
	} else {
		outFile.Contents = *args.Contents
	}

	return outFile, nil
}

// DeleteFile is the resolver for the deleteFile field.
func (r *mutationResolver) DeleteFile(ctx context.Context, id string) (*model.File, error) {
	panic(fmt.Errorf("not implemented: DeleteFile - deleteFile"))
}

// CreateDirectory is the resolver for the createDirectory field.
func (r *mutationResolver) CreateDirectory(ctx context.Context, name string, parentDirectory string) (*model.Directory, error) {
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	driveSrv, err := r.Google.DriveService(token)
	if err != nil {
		return nil, err
	}

	newDir, err := driveSrv.Files.Create(&drive.File{
		Name:     name,
		MimeType: "application/vnd.google-apps.folder",
		Parents:  []string{parentDirectory},
	}).Do()
	if err != nil {
		return nil, err
	}

	return &model.Directory{
		ID:          newDir.Id,
		Name:        newDir.Name,
		CreatedAt:   newDir.CreatedTime,
		UpdatedAt:   newDir.ModifiedTime,
		Files:       []*model.File{},
		Directories: []*model.Directory{},
	}, nil
}

// DeleteDirectory is the resolver for the deleteDirectory field.
func (r *mutationResolver) DeleteDirectory(ctx context.Context, id string) (*model.Directory, error) {
	panic(fmt.Errorf("not implemented: DeleteDirectory - deleteDirectory"))
}

// RenameDirectory is the resolver for the renameDirectory field.
func (r *mutationResolver) RenameDirectory(ctx context.Context, id string, name string) (*model.Directory, error) {
	panic(fmt.Errorf("not implemented: RenameDirectory - renameDirectory"))
}

// RenameFile is the resolver for the renameFile field.
func (r *mutationResolver) RenameFile(ctx context.Context, id string, name string) (*model.File, error) {
	panic(fmt.Errorf("not implemented: RenameFile - renameFile"))
}

// MoveFile is the resolver for the moveFile field.
func (r *mutationResolver) MoveFile(ctx context.Context, id string, directoryID string) (*model.File, error) {
	panic(fmt.Errorf("not implemented: MoveFile - moveFile"))
}

// MoveDirectory is the resolver for the moveDirectory field.
func (r *mutationResolver) MoveDirectory(ctx context.Context, id string, directoryID string) (*model.Directory, error) {
	panic(fmt.Errorf("not implemented: MoveDirectory - moveDirectory"))
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*model.User, error) {
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	uSrv, err := r.Google.UserService(token)
	if err != nil {
		return nil, err
	}
	userInfo, err := uSrv.Userinfo.Get().Do()
	if err != nil {
		return nil, err
	}

	return &model.User{
		ID:    userInfo.Id,
		Name:  userInfo.Name,
		Image: userInfo.Picture,
		Email: userInfo.Email,
	}, nil
}

// BaseDirectory is the resolver for the baseDirectory field.
func (r *queryResolver) BaseDirectory(ctx context.Context) (*model.Directory, error) {
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	driveSrv, err := r.Google.DriveService(token)
	if err != nil {
		return nil, err
	}

	baseDirectories, err := driveSrv.Files.List().Q("mimeType = 'application/vnd.google-apps.folder' and name = 'Skewax'").Do()
	if err != nil {
		return nil, err
	}
	var baseDir *drive.File

	// If the base directory doesn't exist, create it
	if len(baseDirectories.Files) == 0 {
		baseDir, err = driveSrv.Files.Create(&drive.File{
			Name:     "Skewax",
			MimeType: "application/vnd.google-apps.folder",
		}).Do()
		if err != nil {
			return nil, err
		}
	} else {
		baseDir = baseDirectories.Files[0]
	}

	fields := GetPreloads(ctx)
	return GetDirectory(driveSrv, baseDir.Id, fields)
}

// Directory is the resolver for the directory field.
func (r *queryResolver) Directory(ctx context.Context, id string) (*model.Directory, error) {
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	driveSrv, err := r.Google.DriveService(token)
	if err != nil {
		return nil, err
	}
	fields := GetPreloads(ctx)
	return GetDirectory(driveSrv, id, fields)
}

// File is the resolver for the file field.
func (r *queryResolver) File(ctx context.Context, id string) (*model.File, error) {
	token, err := r.getUserToken(ctx)
	if err != nil {
		return nil, err
	}

	driveSrv, err := r.Google.DriveService(token)
	if err != nil {
		return nil, err
	}
	fields := GetPreloads(ctx)
	return GetFile(driveSrv, id, fields)
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
