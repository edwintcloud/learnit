package models

import "time"

// Resource is our resource model
type Resource struct {
	ID          int       `gorm:"primary_key" json:"id"`
	CreatedAt   time.Time `gorm:"DEFAULT:current_timestamp" json:"created_at"`
	UpdatedAt   time.Time `gorm:"DEFAULT:current_timestamp" json:"updated_at"`
	TopicID     int       `gorm:"index" json:"topic_id"`
	UserID      int       `gorm:"index" json:"user_id"`
	User        User      `json:"user"`
	Description string    `json:"description"`
	Link        string    `json:"link"`
	UpVotes     int       `json:"up_votes"`
	DownVotes   int       `json:"down_votes"`
}
