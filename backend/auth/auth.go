package auth

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"skewax/db"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type Claims struct {
	UserId string `json:"user_id"`
	jwt.RegisteredClaims
}

var (
	jwtKey = []byte(os.Getenv("JWT_KEY"))
)

func GenerateJWT(userId string) (string, error) {
	claims := Claims{
		userId,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
			Issuer:    "Skewax",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return ss, nil

}

func ParseJWT(tokenStr string) (string, error) {
	claims := Claims{}
	_, err := jwt.ParseWithClaims(tokenStr, &claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("bad token")
		}
		return jwtKey, nil // returns our JWT key to the parser to check if the incoming token is valid
	})
	if err != nil {
		return "", err
	}
	return claims.UserId, nil
}

func Middleware(orm *gorm.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")

			if header == "" {
				http.Error(w, `{ "errors":[ { "message": "authentication error" } ] }`, http.StatusOK)
				return
			}

			// Validate token
			tokenStr := header
			userId, err := ParseJWT(tokenStr)
			if err != nil {
				http.Error(w, `{"errors":[ { "message": "authentication error" }, { "message": "`+err.Error()+`" } ]}`, http.StatusOK)
				return
			}

			user := db.AuthUser{}

			err = orm.First(&user, "id = ?", userId).Error
			if err != nil {
				http.Error(w, `{"errors":[ { "message": "authentication error" }, { "message": "`+err.Error()+`" } ]}`, http.StatusOK)
				return
			}

			ctx := context.WithValue(r.Context(), "user", user)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
