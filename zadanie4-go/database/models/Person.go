package models

import "gorm.io/gorm"

type Person struct {
	gorm.Model

	FirstName  string
	SecondName string
}
