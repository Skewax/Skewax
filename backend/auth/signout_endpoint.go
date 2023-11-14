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

	fmt.Println("I am supposed to be signing people out!")

	sessionId := r.URL.Query().Get("session")
	session := db.SessionToken{}
	err := h.DB.First(&session, "id = ?", sessionId).Error

	fmt.Println("Passed in ID:")
	fmt.Println(sessionId)

	fmt.Println("Token found:")
	fmt.Println(session)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Hi! I am not doing my job right now.")
		h.DB.Delete(&session)
	}
}
