-- name: CreateUser :one
INSERT INTO users (name, phone_number, role)
VALUES ($1, $2, $3)
RETURNING id, name, phone_number, role, created_at;

-- name: UpdateUserRole :exec
UPDATE users
SET role = $2
WHERE phone_number = $1;

-- name: GetUserByPhoneNumber :one
SELECT id, name, phone_number, role, reset_token, reset_token_expiry, created_at
FROM users
WHERE phone_number = $1
LIMIT 1;

-- name: GetUserByID :one
SELECT id, name, phone_number, role, reset_token, reset_token_expiry, created_at
FROM users
WHERE id = $1
LIMIT 1;

-- name: UpdateUserOTP :exec
UPDATE users
SET reset_token = $2, reset_token_expiry = $3
WHERE phone_number = $1;

-- name: ClearUserOTP :exec
UPDATE users
SET reset_token = NULL, reset_token_expiry = NULL
WHERE id = $1;

-- name: ListUsers :many
SELECT id, name, phone_number, role, created_at
FROM users
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;