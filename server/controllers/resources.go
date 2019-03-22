package controllers

import (
	"net/http"
	"strconv"

	"github.com/edwintcloud/learnit/server/models"
	"github.com/labstack/echo"
)

// RegisterResources registers resources routes with api
func (api *API) RegisterResources() {

	// run model migrations on db
	api.DB.AutoMigrate(&models.Resource{})

	// api routes
	routes := api.Server.Group("/api/v1/resources")
	{
		routes.GET("", api.GetResources)
		routes.GET("/by_topic/:id", api.GetResourcesByTopic)
	}
}

// GetResources gets all resources
func (api *API) GetResources(c echo.Context) error {
	resources := []models.Resource{}
	api.DB.Find(&resources)
	return c.JSON(http.StatusOK, resources)
}

// GetResourcesByTopic gets all resources by topic id
func (api *API) GetResourcesByTopic(c echo.Context) error {
	resources := []models.Resource{}
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	api.DB.Where(&models.Resource{TopicID: id}).Find(&resources)
	return c.JSON(http.StatusOK, resources)
}
