package auth

import (
	"fmt"
	"net/http"
	"skewax/db"

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
		h.DB.Delete(&session)
	}
}
