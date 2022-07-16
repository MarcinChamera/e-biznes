package controllers

import (
	"backend/database"
	"backend/database/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetOrders(c echo.Context) error {
	var orders []models.Order
	database.GetDatabase().Find(&orders)
	return c.JSON(http.StatusOK, orders)
}

func AddOrder(c echo.Context) error {
	order := new(models.Order)
	if err := c.Bind(order); err != nil {
		return err
	}
	database.GetDatabase().Create(&order)
	return c.String(http.StatusCreated, "Created")
}
