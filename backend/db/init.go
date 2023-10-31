package db

import (
	"fmt"
	"os"
	"time"

	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type AuthUser struct {
	ID                string
	AccessToken       string
	AccessTokenExpiry *time.Time
	RefreshToken      string
}

func (u *AuthUser) GetToken() *oauth2.Token {
	return &oauth2.Token{
		AccessToken:  u.AccessToken,
		RefreshToken: u.RefreshToken,
		Expiry:       *u.AccessTokenExpiry,
	}
}

type SessionToken struct {
	gorm.Model
	ID         uuid.UUID `gorm:"type:uuid;default:gen_random_uuid()"`
	Expiry     *time.Time
	AuthUserID string
	AuthUser   AuthUser
}

func InitDB() *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&AuthUser{}, &SessionToken{})
	return db
}
