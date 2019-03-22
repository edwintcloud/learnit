package models

import "github.com/jinzhu/gorm"

// Resource is our resource model
type Resource struct {
	gorm.Model
	TopicID   int    `gorm:"index" json:"topic_id"`
	Link      string `json:"link"`
	Coupon    string `json:"coupon"`
	UpVotes   int    `json:"up_votes"`
	DownVotes int    `json:"down_votes"`
}
