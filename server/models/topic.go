package models

import "time"

// Topic is our topic model
type Topic struct {
	ID          int        `gorm:"primary_key" json:"id"`
	CreatedAt   time.Time  `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt   time.Time  `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	CategoryID  int        `gorm:"index" json:"category_id"`
	Name        string     `json:"name"`
	Description string     `gorm:"type:text" json:"description"`
	ImageURL    string     `json:"img_url"`
	Resources   []Resource `json:"resources,omitempty"`
}
