package models

import "time"

// Vote is our vote model
type Vote struct {
	ID        int       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt time.Time `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	UserID    int       `gorm:"index" json:"user_id"`
	Type      string    `json:"type"`
}
