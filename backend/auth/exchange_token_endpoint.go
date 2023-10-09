package auth

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"skewax/db"
	"time"

	"gorm.io/gorm"
)

type ExhangeHandler struct {
	DB *gorm.DB
}

var (
	redirect = os.Getenv("REDIRECT_URI")
)

func (h *ExhangeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	sessionId := r.URL.Query().Get("session")
	session := db.SessionToken{}
	err := h.DB.First(&session, "id = ?", sessionId).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			http.Redirect(w, r, redirect+"?error=session_error", http.StatusUnauthorized)
			return
		} else {
			http.Redirect(w, r, redirect+"?error=database_error", http.StatusInternalServerError)
			return
		}
	}
	if session.Expiry.Before(time.Now()) {
		h.DB.Delete(&session)
		http.Redirect(w, r, redirect+"?error=session_expiry_error", http.StatusUnauthorized)
		return
	}
	userId := session.AuthUserID
	newSessionExpiry := time.Now().Add(time.Hour*24 + 7)
	newSession := db.SessionToken{
		AuthUserID: userId,
		Expiry:     &newSessionExpiry,
	}
	fmt.Println(userId)
	h.DB.Create(&newSession)
	h.DB.Delete(&session)
	userToken, err := GenerateJWT(userId)
	if err != nil {
		http.Redirect(w, r, redirect+"?error=token_error", http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, redirect+"?token="+userToken+"&session="+newSession.ID.String(), http.StatusFound)
}
