package controllers

import (
	"fmt"
	"net/http"

	"github.com/edwintcloud/learnit/server/models"
	"github.com/labstack/echo"
)

// RegisterCategories registers categories routes with api
func (api *API) RegisterCategories() {

	// run model migrations on db
	api.DB.AutoMigrate(&models.Category{})

	// api routes
	routes := api.Server.Group("/api/v1/categories")
	{
		routes.GET("", api.GetCategories)
	}
}

// GetCategories gets all categories from the database
func (api *API) GetCategories(c echo.Context) error {
	return c.JSON(http.StatusOK, models.Response{
		Message: fmt.Sprintf("%s %s OK", c.Request().Method, c.Request().RequestURI),
		Status:  http.StatusOK,
	})
}
