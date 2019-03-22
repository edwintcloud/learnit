package models

import "time"

// Category is our category model
type Category struct {
	ID        uint64    `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt time.Time `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	Name      string    `json:"name"`
	Topics    []Topic   `json:"topics,omitempty"`
}
