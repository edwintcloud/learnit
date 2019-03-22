package models

// Response is our json response messsage model, also used for errors
type Response struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
}
