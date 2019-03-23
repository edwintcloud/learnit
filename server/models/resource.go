package models

import "time"

// Resource is our resource model
type Resource struct {
	ID          uint64    `gorm:"primary_key" json:"id"`
	CreatedAt   time.Time `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt   time.Time `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	TopicID     int       `gorm:"index" json:"topic_id"`
	Description string    `json:"description"`
	Link        string    `json:"link"`
	Author      string    `json:"author"`
	UpVotes     int       `json:"up_votes"`
	DownVotes   int       `json:"down_votes"`
}
