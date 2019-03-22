package controllers

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
)

// API is our api model
type API struct {
	Server *echo.Echo
	DB     *gorm.DB
}

// RegisterRoutes registers api routes with echo server
func (api *API) RegisterRoutes() {
	api.RegisterCategories()
	api.RegisterTopics()
	api.RegisterResources()
}
