package models

import "github.com/jinzhu/gorm"

// Category is our category model
type Category struct {
	gorm.Model
	Name   string  `json:"name"`
	Topics []Topic `json:"topics"`
}
