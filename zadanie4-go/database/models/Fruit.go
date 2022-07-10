package models

import "gorm.io/gorm"

type Fruit struct {
	gorm.Model

	Name  string
	Color string
}
