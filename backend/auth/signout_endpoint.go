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

type SignoutHandler struct
{
	DB *gorm.DB
}

var (
	redirect=os.getenv("REDIRECT_URI")
)

func (h *SignoutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	sessionId := r.URL.Query().get("session")
	session := db.SessionToken{}
	err := h.DB.First(&session, "id = ?", sessionId).Error
	if err != nil {
		fmt.println(err);
	} else {
		h.DB.Delete(&session);
	}
}
