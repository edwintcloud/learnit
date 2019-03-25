package models

import "time"

// User is our user model
type User struct {
	ID        int        `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt time.Time  `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	FirstName string     `json:"first_name"`
	LastName  string     `json:"last_name"`
	Email     string     `json:"email"`
	Password  string     `json:"password"`
	Token     string     `gorm:"-" json:"token,omitempty"`
	Resources []Resource `json:"resources,omitempty"`
}
