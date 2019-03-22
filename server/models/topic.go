package models

import "github.com/jinzhu/gorm"

// Topic is our topic model
type Topic struct {
	gorm.Model
	CategoryID  int        `gorm:"index" json:"category_id"`
	Name        string     `json:"name"`
	Description string     `gorm:"type:text" json:"description"`
	ImageURL    string     `json:"img_url"`
	Resources   []Resource `json:"resources"`
}
