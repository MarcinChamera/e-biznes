package database

import (
	"go-echo-gorm/database/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("go.db"))
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Country{})
	db.AutoMigrate(&models.Tire{})
	db.AutoMigrate(&models.Bike{})
	db.AutoMigrate(&models.Person{})
	db.AutoMigrate(&models.Fruit{})

	return db
}
