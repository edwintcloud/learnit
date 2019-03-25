package controllers

import (
	"net/http"
	"os"
	"strconv"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/edwintcloud/learnit/server/models"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
)

// RegisterUsers registers Users routes with api
func (api *API) RegisterUsers() {

	// run model migrations on db
	api.DB.AutoMigrate(&models.User{})

	// api routes
	routes := api.Server.Group("/api/v1/users")
	{
		routes.POST("/create", api.CreateUser)
		routes.POST("/login", api.LoginUser)
	}
}

// CreateUser creates a new User in the db
func (api *API) CreateUser(c echo.Context) error {
	user := models.User{}
	err := c.Bind(&user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	user.Password = string(password)
	err = api.DB.Create(&user).Error
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	err = generateJwt(&user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	user.Password = ""
	return c.JSON(http.StatusOK, user)
}

// LoginUser authenticates an existing user in the db
func (api *API) LoginUser(c echo.Context) error {
	user := models.User{}
	foundUser := models.User{}
	err := c.Bind(&user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	err = api.DB.Where(&models.User{Email: user.Email}).First(&foundUser).Error
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password))
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	err = generateJwt(&foundUser)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Response{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
	}
	foundUser.Password = ""
	return c.JSON(http.StatusOK, foundUser)
}

// generate jwt token
func generateJwt(u *models.User) error {
	var err error

	// create token
	token := jwt.New(jwt.SigningMethodHS256)

	// set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = strconv.Itoa(u.ID)
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// generate encoded token and set Token field
	u.Token, err = token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return err
	}

	// if all went well, return nil
	return nil
}
