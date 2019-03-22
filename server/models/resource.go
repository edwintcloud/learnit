package models

import "time"

// Resource is our resource model
type Resource struct {
	ID        uint64    `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt time.Time `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	TopicID   int       `gorm:"index" json:"topic_id"`
	Link      string    `json:"link"`
	Coupon    string    `json:"coupon"`
	UpVotes   int       `json:"up_votes"`
	DownVotes int       `json:"down_votes"`
}
