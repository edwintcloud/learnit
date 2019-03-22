package controllers

import "github.com/labstack/echo"

// API is our api model
type API struct {
	Server *echo.Echo
}

// RegisterRoutes registers api routes with echo server
func (api *API) RegisterRoutes() {
	api.RegisterCategories()
}
