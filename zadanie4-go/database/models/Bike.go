package models

import "gorm.io/gorm"

type Bike struct {
	gorm.Model

	ModelName string
	TireId    int
}
