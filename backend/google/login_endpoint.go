package google

import (
	"net/http"
	"strings"
)

type ReqestedScopes struct {
	email     bool
	profile   bool
	driveFile bool
}

func ServeLoginEndpoint(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()

	//validate request

	//verify all scopes are present (if not then redirect to frontend with error)
	scopes := strings.Split(params.Get("scope"), "%20")
	requested := ReqestedScopes{}
	for _, scope := range scopes {
		switch scope {
		case "email":
			requested.email = true
		case "profile":
			requested.profile = true
		case "https://www.googleapis.com/auth/drive.file":
			requested.driveFile = true
		}
	}
	if !requested.email || !requested.profile || !requested.driveFile {
		//redirect to frontend with error
	}

	//get google tokens

	//get user info from google

	//add to db

	//generate jwt

	//redirect to frontend with jwt

	w.Write([]byte(params.Get("authuser")))
	w.Write([]byte(params.Get("code")))
	w.Write([]byte(params.Get("hd")))
	w.Write([]byte(params.Get("prompt")))
	w.Write([]byte(params.Get("scope")))
	w.Write([]byte(params.Get("state")))

}
