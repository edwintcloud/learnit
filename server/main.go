package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/edwintcloud/learnit/server/controllers"
	"github.com/edwintcloud/learnit/server/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	// create new instance of echo web server
	e := echo.New()

	// register logging middleware
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${method}  ${uri}  ${latency_human}  ${status}\n",
	}))

	// CORS config
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://learnit.now.sh", "http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	// connect to database and defer session to close when server is shutdown
	db := ConnectDB()
	defer db.Close()

	// register api with echo server
	api := controllers.API{
		Server: e,
		DB:     db,
	}
	api.RegisterRoutes()

	// catch all route
	e.Any("*", func(c echo.Context) error {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: fmt.Sprintf("Bad Request - %s %s", c.Request().Method, c.Request().RequestURI),
			Status:  http.StatusBadRequest,
		})
	})

	// listen for requests
	e.Logger.Fatal(e.Start(os.Getenv("PORT")))
}

// ConnectDB connects to mysql db
func ConnectDB() *gorm.DB {
	db, err := gorm.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	))
	if err != nil {
		log.Fatalf("Unable to open mysql connection: %s", err)
	}
	return db
}
