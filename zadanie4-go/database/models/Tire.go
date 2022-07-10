package models

import "gorm.io/gorm"

type Tire struct {
	gorm.Model

	ModelName string
}
