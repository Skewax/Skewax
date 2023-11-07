// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Directory struct {
	Name        string       `json:"name"`
	CreatedAt   string       `json:"createdAt"`
	UpdatedAt   string       `json:"updatedAt"`
	ID          string       `json:"id"`
	Files       []*File      `json:"files"`
	Directories []*Directory `json:"directories"`
}

type File struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
	IsPbasic  bool   `json:"isPBASIC"`
	Writable  bool   `json:"writable"`
	Contents  string `json:"contents"`
}

type FileCreate struct {
	Name     string `json:"name"`
	Contents string `json:"contents"`
}

type FileUpdate struct {
	Name     *string `json:"name,omitempty"`
	Contents *string `json:"contents,omitempty"`
}

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Image string `json:"image"`
	Email string `json:"email"`
}
