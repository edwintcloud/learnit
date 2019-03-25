package controllers

import (
	"net/http"
	"os"
	"strconv"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/edwintcloud/learnit/server/models"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// RegisterResources registers resources routes with api
func (api *API) RegisterResources() {

	// run model migrations on db
	api.DB.AutoMigrate(&models.Resource{})
	api.DB.AutoMigrate(&models.Vote{})

	// protected api routes
	protectedRoutes := api.Server.Group("/api/v1/resources/authorized")
	protectedRoutes.Use(middleware.JWT([]byte(os.Getenv("JWT_SECRET"))))
	{
		protectedRoutes.POST("/create", api.CreateResource)
		protectedRoutes.POST("/vote", api.CreateVote)
	}

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
	api.DB.Where(&models.Resource{TopicID: id}).Preload("User").Preload("Votes").Find(&resources)
	for i := range resources {
		resources[i].User.Password = ""
	}
	return c.JSON(http.StatusOK, resources)
}

// CreateResource creates a new resource in the db
func (api *API) CreateResource(c echo.Context) error {
	// get user id from jwt
	userJWT := c.Get("user").(*jwt.Token)
	claims := userJWT.Claims.(jwt.MapClaims)
	id, err := strconv.Atoi(claims["id"].(string))
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	resource := models.Resource{UserID: id}
	err = c.Bind(&resource)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	api.DB.Create(&resource)
	return c.JSON(http.StatusOK, resource)
}

// CreateVote creates a new vote in the db
func (api *API) CreateVote(c echo.Context) error {
	votes := []models.Vote{}
	// get user id from jwt
	userJWT := c.Get("user").(*jwt.Token)
	claims := userJWT.Claims.(jwt.MapClaims)
	id, err := strconv.Atoi(claims["id"].(string))
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	vote := models.Vote{UserID: id}
	err = c.Bind(&vote)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	api.DB.Where(&models.Vote{UserID: vote.UserID, ResourceID: vote.ResourceID}).Find(&votes)
	if len(votes) > 0 {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: "User has already voted for this resource",
			Status:  http.StatusBadRequest,
		})
	}
	api.DB.Create(&vote)
	return c.JSON(http.StatusOK, vote)
}
