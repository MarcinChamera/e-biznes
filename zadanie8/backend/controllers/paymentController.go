package controllers

import (
	"backend/database"
	"backend/database/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetPayments(c echo.Context) error {
	var payments []models.Payment
	database.GetDatabase().Find(&payments)
	return c.JSON(http.StatusOK, payments)
}

func AddPayment(c echo.Context) error {
	payment := new(models.Payment)
	if err := c.Bind(payment); err != nil {
		return err
	}
	database.GetDatabase().Create(&payment)
	return c.String(http.StatusCreated, strconv.Itoa(int(payment.ID)))
}
