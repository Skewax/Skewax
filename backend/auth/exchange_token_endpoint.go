package auth

import (
	"encoding/json"
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

// TODO: rewrite this to not use redirects and instead just return in the body
func (h *ExhangeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	sessionId := r.URL.Query().Get("session")
	session := db.SessionToken{}
	err := h.DB.First(&session, "id = ?", sessionId).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			http.Error(w, "Session Error", http.StatusUnauthorized)
			return
		} else {
			http.Error(w, "Database Error", http.StatusInternalServerError)
			return
		}
	}
	if session.Expiry.Before(time.Now()) {
		h.DB.Delete(&session)
		http.Error(w, "Session Expired", http.StatusUnauthorized)
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
		http.Error(w, "Token Error", http.StatusInternalServerError)
		return
	}
	jsonOut, err := json.Marshal(map[string]string{
		"token":   userToken,
		"session": newSession.ID.String(),
	})
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	w.Write([]byte(jsonOut))
}
