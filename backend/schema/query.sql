-- Users --

-- name: CreateUser :one
INSERT INTO users (name, phone_number, role)
VALUES ($1, $2, $3)
RETURNING id, name, phone_number, role, created_at;

-- name: GetUserByID :one
SELECT id, name, phone_number, role, reset_token, reset_token_expiry, created_at
FROM users
WHERE id = $1
LIMIT 1;

-- name: GetUserByPhoneNumber :one
SELECT id, name, phone_number, role, reset_token, reset_token_expiry, created_at
FROM users
WHERE phone_number = $1
LIMIT 1;

-- name: ListUsers :many
SELECT id, name, phone_number, role, created_at
FROM users
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateUserRole :exec
UPDATE users
SET role = $2
WHERE phone_number = $1;

-- name: UpdateUserOTP :exec
UPDATE users
SET reset_token = $2, reset_token_expiry = $3
WHERE phone_number = $1;

-- name: ClearUserOTP :exec
UPDATE users
SET reset_token = NULL, reset_token_expiry = NULL
WHERE id = $1;

-- name: UpdateUserProfile :one
UPDATE users
SET name = $2,
    nik = $3,
    phone_number = $4,
    is_notification_enabled = $5
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- Children --

-- name: CreateChild :one
INSERT INTO children (parent_id, nik, full_name, gender, birth_date, home_address)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetChildByID :one
SELECT * FROM children
WHERE id = $1
LIMIT 1;

-- name: ListChildren :many
SELECT * FROM children
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: ListChildrenByParentID :many
SELECT * FROM children
WHERE parent_id = $1
ORDER BY created_at DESC;

-- name: UpdateChild :one
UPDATE children
SET nik = $2,
    full_name = $3,
    gender = $4,
    birth_date = $5,
    home_address = $6,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteChild :exec
DELETE FROM children
WHERE id = $1;


-- Measuremenets --

-- name: CreateMeasurement :one
INSERT INTO measurement (
    measurer_id,
    measurer_role,
    children_id,
    age,
    weight,
    height,
    stunting_status,
    z_score,
    head_circumference,
    upper_arm_circumference
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;

-- name: GetMeasurementByID :one
SELECT * FROM measurement
WHERE id = $1
LIMIT 1;

-- name: GetMeasurements :many
SELECT * FROM measurement
WHERE measurer_id = $1
ORDER BY measured_at DESC;

-- name: ListMeasurementsByChildID :many
SELECT * FROM measurement
WHERE children_id = $1
ORDER BY measured_at DESC;

-- name: UpdateMeasurement :one
UPDATE measurement
SET weight = $2,
    height = $3,
    stunting_status = $4,
    z_score = $5,
    head_circumference = $6,
    upper_arm_circumference = $7
WHERE id = $1
RETURNING *;

-- name: DeleteMeasurement :exec
DELETE FROM measurement
WHERE id = $1;


-- Quizzes --

-- name: CreateQuiz :one
INSERT INTO quiz (creator_id, title, description)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetQuizByID :one
SELECT * FROM quiz
WHERE id = $1
LIMIT 1;

-- name: ListQuizzes :many
SELECT * FROM quiz
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateQuiz :one
UPDATE quiz
SET title = $2,
    description = $3,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteQuiz :exec
DELETE FROM quiz
WHERE id = $1;


-- Quiz questions --

-- name: CreateQuizQuestion :one
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_ans)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetQuizQuestionByID :one
SELECT * FROM quiz_questions
WHERE id = $1
LIMIT 1;

-- name: ListQuizQuestionsByQuizID :many
SELECT * FROM quiz_questions
WHERE quiz_id = $1;

-- name: UpdateQuizQuestion :one
UPDATE quiz_questions
SET question_text = $2,
    question_type = $3,
    options = $4,
    correct_ans = $5
WHERE id = $1
RETURNING *;

-- name: DeleteQuizQuestion :exec
DELETE FROM quiz_questions
WHERE id = $1;


-- Quiz submissions --

-- name: CreateQuizSubmission :one
INSERT INTO quiz_submissions (kader_id, quiz_id, score, answers)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetQuizSubmissionByID :one
SELECT * FROM quiz_submissions
WHERE id = $1
LIMIT 1;

-- name: ListQuizSubmissionsByQuizID :many
SELECT * FROM quiz_submissions
WHERE quiz_id = $1
ORDER BY submitted_at DESC;

-- name: ListQuizSubmissionsByKaderID :many
SELECT * FROM quiz_submissions
WHERE kader_id = $1
ORDER BY submitted_at DESC;

-- name: DeleteQuizSubmission :exec
DELETE FROM quiz_submissions
WHERE id = $1;


-- Education materials --

-- name: CreateEducationMaterial :one
INSERT INTO education_material (creator_id, title, description, video_url)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetEducationMaterialByID :one
SELECT * FROM education_material
WHERE id = $1
LIMIT 1;

-- name: ListEducationMaterials :many
SELECT * FROM education_material
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateEducationMaterial :one
UPDATE education_material
SET title = $2,
    description = $3,
    video_url = $4,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteEducationMaterial :exec
DELETE FROM education_material
WHERE id = $1;


-- Notifications --

-- name: CreateNotification :one
INSERT INTO notifications (user_id, title, message)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetNotificationByID :one
SELECT * FROM notifications
WHERE id = $1
LIMIT 1;

-- name: ListNotificationsByUserID :many
SELECT * FROM notifications
WHERE user_id = $1
ORDER BY created_at DESC;

-- name: MarkNotificationAsRead :exec
UPDATE notifications
SET is_read = TRUE
WHERE id = $1;

-- name: DeleteNotification :exec
DELETE FROM notifications
WHERE id = $1;
