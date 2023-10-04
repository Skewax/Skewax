package auth

import (
	"context"
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
	jwtKey = os.Getenv("JWT_KEY")
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
	ss, err := token.SignedString([]byte(jwtKey))
	if err != nil {
		return "", err
	}
	return ss, nil

}

func ParseJWT(tokenStr string) (string, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userId := claims["user_id"].(string)
		return userId, nil
	}
	return "", err
}

func Middleware(orm *gorm.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")

			// Allow unauthenticated users in
			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			// Validate token
			tokenStr := header
			userId, err := ParseJWT(tokenStr)
			if err != nil {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			user := orm.First(&db.AuthUser{}, "id = ?", userId)
			if user.Error != nil {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), "user", &user)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
