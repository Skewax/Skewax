package db

import (
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type AuthUser struct {
	ID                string
	AccessToken       string
	AccessTokenExpiry *time.Time
	RefreshToken      string
}

type SessionToken struct {
	gorm.Model
	ID         string
	Expiry     *time.Time
	AuthUserID string
	AuthUser   AuthUser
}

func InitDB() *gorm.DB {
	dsn := "host=db user=admin password=pass dbname=skewax port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&AuthUser{}, &SessionToken{})
	return db
}
