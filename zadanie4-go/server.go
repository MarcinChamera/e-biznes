package main

import (
	"go-echo-gorm/database"
	"go-echo-gorm/database/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	db := database.Connect()
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/fruits", func(c echo.Context) error {
		var fruits []models.Fruit
		db.Find(&fruits)
		return c.JSON(http.StatusOK, fruits)
	})

	e.POST("/fruits", func(c echo.Context) error {
		fruit := new(models.Fruit)
		if err := c.Bind(fruit); err != nil {
			return err
		}
		db.Create(&fruit)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/tires", func(c echo.Context) error {
		var tires []models.Tire
		db.Find(&tires)
		return c.JSON(http.StatusOK, tires)
	})

	e.POST("/tires", func(c echo.Context) error {
		tire := new(models.Tire)
		if err := c.Bind(tire); err != nil {
			return err
		}
		db.Create(&tire)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/bikes", func(c echo.Context) error {
		var bikes []models.Bike
		db.Find(&bikes)
		return c.JSON(http.StatusOK, bikes)
	})

	e.POST("/bikes", func(c echo.Context) error {
		bike := new(models.Bike)
		if err := c.Bind(bike); err != nil {
			return err
		}
		db.Create(&bike)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/countries", func(c echo.Context) error {
		var countries []models.Country
		db.Find(&countries)
		return c.JSON(http.StatusOK, countries)
	})

	e.POST("/countries", func(c echo.Context) error {
		country := new(models.Country)
		if err := c.Bind(country); err != nil {
			return err
		}
		db.Create(&country)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/persons", func(c echo.Context) error {
		var persons []models.Person
		db.Find(&persons)
		return c.JSON(http.StatusOK, persons)
	})

	e.POST("/persons", func(c echo.Context) error {
		person := new(models.Person)
		if err := c.Bind(person); err != nil {
			return err
		}
		db.Create(&person)
		return c.String(http.StatusCreated, "Created")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
