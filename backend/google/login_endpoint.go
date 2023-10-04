package google

import (
	"fmt"
	"net/http"
	"os"
	"skewax/auth"
	"skewax/db"
	"strings"
	"time"

	_ "github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type LoginHandler struct {
	Google *GoogleProvider
	DB     *gorm.DB
}

func (h *LoginHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	redirect := os.Getenv("REDIRECT_URI")

	//validate request

	//verify all scopes are present (if not then redirect to frontend with error)
	scopes := strings.Split(params.Get("scope"), " ")
	neededScopes := strings.Split(os.Getenv("GOOGLE_OAUTH_SCOPES"), ",")
	overlap := make([]string, 0)
	for _, scope := range scopes {
		for _, neededScope := range neededScopes {
			if strings.Compare(scope, neededScope) == 0 {
				overlap = append(overlap, scope)
			}
		}
	}
	if len(overlap) != len(neededScopes) {
		//redirect to frontend with error
		http.Redirect(w, r, redirect+"?error=invalid_scope", http.StatusUnauthorized)
		return
	}

	//get google tokens
	token, err := h.Google.ExchangeCode(params.Get("code"))
	if err != nil {
		//redirect to frontend with error
		fmt.Print(fmt.Errorf("Unable to create service: %v\n", err))
		http.Redirect(w, r, redirect+"?error=invalid_code", http.StatusInternalServerError)
		return
	}

	//get user info from google
	service, err := h.Google.Service(token)
	if err != nil {
		http.Redirect(w, r, redirect+"?error=invalid_token", http.StatusInternalServerError)
		return
	}
	info, err := service.Userinfo.Get().Do()
	if err != nil {
		http.Redirect(w, r, redirect+"?error=invalid_user", http.StatusBadRequest)
		return
	}

	//add to DB

	h.DB.Save([]db.AuthUser{{
		ID:                info.Id,
		AccessToken:       token.AccessToken,
		AccessTokenExpiry: &token.Expiry,
		RefreshToken:      token.RefreshToken,
	}})

	//generate jwt and refresh token
	sessionExpiry := time.Now().Add(time.Hour * 24 * 7)
	SessionTokenObj := db.SessionToken{
		AuthUserID: info.Id,
		Expiry:     &sessionExpiry,
	}
	h.DB.Create(&SessionTokenObj)
	userToken, err := auth.GenerateJWT(info.Id)

	//redirect to frontend with jwt
	http.Redirect(w, r, redirect+"?token="+userToken+"&session="+SessionTokenObj.ID.String(), http.StatusFound)

}
