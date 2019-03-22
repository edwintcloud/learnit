package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/edwintcloud/learnit/server/controllers"
	"github.com/edwintcloud/learnit/server/models"
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

	// register api with echo server
	api := controllers.API{Server: e}
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
