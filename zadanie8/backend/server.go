package main

import (
	"backend/controllers"
	"backend/database"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func generateNewToken(length int) string {
	token := make([]rune, length)
	for i := range token {
		token[i] = letters[rand.Intn(len(letters))]
	}
	return string(token)
}

func main() {
	e := echo.New()
	database.Connect()

	googleConfig := &oauth2.Config{
		RedirectURL:  "http://localhost:1323/google/callback",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	githubConfig := &oauth2.Config{
		RedirectURL:  "http://localhost:1323/github/callback",
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Scopes: []string{
			"user:email",
			"read:user",
		},
		Endpoint: github.Endpoint,
	}

	facebookConfig := &oauth2.Config{
		RedirectURL:  "http://localhost:1323/facebook/callback",
		ClientID:     os.Getenv("FACEBOOK_CLIENT_ID"),
		ClientSecret: os.Getenv("FACEBOOK_CLIENT_SECRET"),
		Scopes: []string{
			"user:email",
			"read:user",
			// "email"
		},
		Endpoint: facebook.Endpoint,
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	e.GET("/users", controllers.GetUsers)

	e.GET("/products", controllers.GetProducts)

	e.GET("/products/:id", controllers.GetProduct)

	e.POST("/products", controllers.AddProduct)

	e.GET("/payments", controllers.GetPayments)

	e.POST("/payment", controllers.AddPayment)

	e.GET("/orders", controllers.GetOrders)

	e.POST("/order", controllers.AddOrder)

	e.GET("/google/callback", func(c echo.Context) error {
		token, err := googleConfig.Exchange(context.Background(), c.QueryParam("code"))

		if err != nil {
			fmt.Printf("googleConfig.Exchange error %s", err)
			return err
		}

		resp, err := http.Get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token.AccessToken)

		if err != nil {
			fmt.Printf("http.get google ouath error %s", err)
			return err
		}
		defer resp.Body.Close()

		contents, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			fmt.Printf("ioutil.ReadAll error %s", err)
			return err
		}

		user := struct {
			Email string
		}{}

		err = json.Unmarshal(contents, &user)

		if err != nil {
			fmt.Printf("json.Unmarshal error %s", err)
			return err
		}

		user.Email = strings.ToLower(user.Email)
		if !controllers.CheckIfUserExists(user.Email, "google") {
			controllers.AddUser(user.Email, "google", *token)
		}

		userFromGet := controllers.GetUser(user.Email, "google")

		newToken := generateNewToken(40)
		userId := strconv.Itoa(int(userFromGet.ID))

		c.Redirect(http.StatusFound, "http://localhost:3000/login/auth/google/success/"+newToken+"&"+user.Email+"&"+userId)

		return c.JSON(http.StatusOK, echo.Map{
			"token": newToken,
			"user":  userFromGet,
		})
	})

	e.GET("/google/login", func(c echo.Context) error {
		url := googleConfig.AuthCodeURL("state")
		return c.JSON(http.StatusOK, url)
	})

	e.GET("/github/login", func(c echo.Context) error {
		url := githubConfig.AuthCodeURL("state")
		return c.JSON(http.StatusOK, url)
	})

	e.GET("/github/callback", func(c echo.Context) error {
		token, err := githubConfig.Exchange(context.Background(), c.QueryParam("code"))

		if err != nil {
			fmt.Printf("githubConfig.Exchange error %s", err)
			return err
		}

		req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
		if err != nil {
			fmt.Println("http.NewRequest GET error")
			return err
		}

		req.Header.Add("Accept", "application/vnd.github.v3+json")
		req.Header.Add("Authorization", "token "+token.AccessToken)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			fmt.Println("http.DefaultClient.Do error")
			print(err)
		}
		defer resp.Body.Close()
		contents, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			fmt.Printf("ioutil.ReadAll error %s", err)
			return err
		}

		user := struct {
			Email string
		}{}

		err = json.Unmarshal(contents, &user)

		if err != nil {
			fmt.Printf("json.Unmarshal error %s", err)
			return err
		}

		user.Email = strings.ToLower(user.Email)
		if !controllers.CheckIfUserExists(user.Email, "github") {
			controllers.AddUser(user.Email, "github", *token)
		}

		userFromGet := controllers.GetUser(user.Email, "github")

		newToken := generateNewToken(40)

		c.Redirect(http.StatusFound, "http://localhost:3000/login/auth/github/success/"+newToken+"&"+user.Email+"&"+strconv.Itoa(int(userFromGet.ID)))

		return c.JSON(http.StatusOK, echo.Map{
			"token": newToken,
			"user":  userFromGet,
		})
	})

	e.GET("/facebook/login", func(c echo.Context) error {
		url := facebookConfig.AuthCodeURL("state")
		return c.JSON(http.StatusOK, url)
	})

	e.GET("/facebook/callback", func(c echo.Context) error {
		token, err := facebookConfig.Exchange(context.Background(), c.QueryParam("code"))

		if err != nil {
			fmt.Printf("facebookConfig.Exchange error %s", err)
			return err
		}

		req, err := http.NewRequest("GET", "https://graph.facebook.com/me?fields=email&access_token="+token.AccessToken, nil)
		if err != nil {
			fmt.Println("http.NewRequest GET error")
			return err
		}

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			fmt.Println("http.DefaultClient.Do error")
			print(err)
		}

		defer resp.Body.Close()
		contents, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			fmt.Printf("ioutil.ReadAll error %s", err)
			return err
		}

		user := struct {
			Email string
		}{}

		err = json.Unmarshal(contents, &user)

		if err != nil {
			fmt.Printf("json.Unmarshal error %s", err)
			return err
		}

		user.Email = strings.ToLower(user.Email)
		if !controllers.CheckIfUserExists(user.Email, "facebook") {
			controllers.AddUser(user.Email, "facebook", *token)
		}

		userFromGet := controllers.GetUser(user.Email, "facebook")

		newToken := generateNewToken(40)

		c.Redirect(http.StatusFound, "http://localhost:3000/login/auth/facebook/success/"+newToken+"&"+user.Email)

		return c.JSON(http.StatusOK, echo.Map{
			"token": newToken,
			"user":  userFromGet,
		})
	})

	e.Logger.Fatal(e.Start(":1323"))
}
