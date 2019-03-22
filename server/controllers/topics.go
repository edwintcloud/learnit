package controllers

import (
	"net/http"
	"strconv"

	"github.com/edwintcloud/learnit/server/models"
	"github.com/labstack/echo"
)

// RegisterTopics registers topics routes with api
func (api *API) RegisterTopics() {

	// run model migrations on db
	api.DB.AutoMigrate(&models.Topic{})

	// api routes
	routes := api.Server.Group("/api/v1/topics")
	{
		routes.GET("", api.GetTopics)
		routes.GET("/by_category/:id", api.GetTopicsByCategory)
	}
}

// GetTopics gets all topics
func (api *API) GetTopics(c echo.Context) error {
	topics := []models.Topic{}
	api.DB.Find(&topics)
	return c.JSON(http.StatusOK, topics)
}

// GetTopicsByCategory gets all topics by category id
func (api *API) GetTopicsByCategory(c echo.Context) error {
	topics := []models.Topic{}
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	api.DB.Where(&models.Topic{CategoryID: id}).Find(&topics)
	return c.JSON(http.StatusOK, topics)
}
