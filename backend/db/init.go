package db

import (
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type AuthUser struct {
	ID                 string
	AccessToken        string
	AccessTokenExpiry  *time.Time
	RefreshToken       string
	RefreshTokenExpiry *time.Time
}

func InitDB() *gorm.DB {
	dsn := "host=db user=admin password=password dbname=skewax port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&AuthUser{})
	return db
}
