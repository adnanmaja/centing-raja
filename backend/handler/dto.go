// Package handler provides HTTP request handling and routing.
package handler

// ErrorResponse represents standard error response body
type ErrorResponse struct {
	Error string `json:"error" example:"error message"`
}

// MessageResponse represents standard message response body
type MessageResponse struct {
	Message string `json:"message" example:"operation successful"`
}

// StatusResponse represents server health status response body
type StatusResponse struct {
	Status string `json:"status" example:"aman"`
}
