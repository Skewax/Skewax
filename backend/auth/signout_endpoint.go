package auth

import (
	"fmt"
	"net/http"
	"net/url"
	"skewax/db"
	"strings"

	"gorm.io/gorm"
)

type SignoutHandler struct {
	DB *gorm.DB
}

func (h *SignoutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	sessionId := r.URL.Query().Get("session")
	session := db.SessionToken{}
	err := h.DB.First(&session, "id = ?", sessionId).Error

	if err != nil {
		fmt.Println(err)
	} else {
		query := "token=" + url.QueryEscape(session.AuthUser.RefreshToken)
		http.NewRequest(http.MethodPost, "https://oauth2.googleapis.com/revoke", strings.NewReader(query))
		h.DB.Delete(&session)
	}
}
