# Quizzes, Questions & Submissions API

This document details all endpoints for managing educational quizzes, questions, and kader submissions in Centing.

---

## 📖 Overview

The quiz module provides educational modules for Posyandu cadres (`kader`) and parents, with structured assessments and submission tracking.

- **Role Permissions**:
  - General Authenticated (`protected`): List/Get quizzes, list quiz questions, submit quiz answers (`/quizzes/...`).
  - Healthcare workers (`tenaga_kesehatan`): Manage quizzes, questions, and review all submissions (`/nakes/quizzes/...`).
  - Posyandu Cadres (`kader`): Review personal quiz submission history (`/kader/submissions`).
- All endpoints require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 📌 Endpoints

### Public / General Authenticated
- [1. List Quizzes](#1-list-quizzes)
- [2. Get Quiz by ID](#2-get-quiz-by-id)
- [3. List Quiz Questions by Quiz ID](#3-list-quiz-questions-by-quiz-id)
- [4. Create Quiz Submission](#4-create-quiz-submission)

### Healthcare Worker (`tenaga_kesehatan`) Management
- [5. Create Quiz (Nakes)](#5-create-quiz-nakes)
- [6. Update Quiz (Nakes)](#6-update-quiz-nakes)
- [7. Delete Quiz (Nakes)](#7-delete-quiz-nakes)
- [8. Create Quiz Question (Nakes)](#8-create-quiz-question-nakes)
- [9. Get Quiz Question by ID (Nakes)](#9-get-quiz-question-by-id-nakes)
- [10. Update Quiz Question (Nakes)](#10-update-quiz-question-nakes)
- [11. Delete Quiz Question (Nakes)](#11-delete-quiz-question-nakes)
- [12. List Quiz Submissions by Quiz ID (Nakes)](#12-list-quiz-submissions-by-quiz-id-nakes)
- [13. Get Quiz Submission by ID (Nakes)](#13-get-quiz-submission-by-id-nakes)
- [14. Delete Quiz Submission (Nakes)](#14-delete-quiz-submission-nakes)

### Cadre (`kader`) Endpoints
- [15. List Quiz Submissions by Kader](#15-list-quiz-submissions-by-kader)

---

## General Authenticated Endpoints

### 1. List Quizzes

Retrieves a paginated list of quizzes.

- **Method**: `GET`
- **Path**: `/quizzes`
- **Authentication**: Bearer JWT
- **Query Parameters**:
  - `limit` (optional, default `10`): Number of quizzes to return.
  - `offset` (optional, default `0`): Pagination offset.

#### Example Request

```http
GET /quizzes?limit=10&offset=0 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76601",
    "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
    "Title": "Modul Pencegahan Stunting Balita",
    "Description": "Kuis pemahaman dasar pencegahan dan penanganan stunting",
    "CreatedAt": "2024-01-15T10:00:00Z",
    "UpdatedAt": "2024-01-15T10:00:00Z"
  }
]
```

---

### 2. Get Quiz by ID

Retrieves details of a single quiz by its UUID.

- **Method**: `GET`
- **Path**: `/quizzes/:id`
- **Authentication**: Bearer JWT

#### Example Request

```http
GET /quizzes/01950d87-35fc-79c2-9014-464a69b76601 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76601",
  "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
  "Title": "Modul Pencegahan Stunting Balita",
  "Description": "Kuis pemahaman dasar pencegahan dan penanganan stunting",
  "CreatedAt": "2024-01-15T10:00:00Z",
  "UpdatedAt": "2024-01-15T10:00:00Z"
}
```

---

### 3. List Quiz Questions by Quiz ID

Retrieves all questions belonging to a quiz.

- **Method**: `GET`
- **Path**: `/quizzes/:id/questions`
- **Authentication**: Bearer JWT

#### Example Request

```http
GET /quizzes/01950d87-35fc-79c2-9014-464a69b76601/questions HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76610",
    "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
    "QuestionText": "Berapa lama ASI eksklusif diberikan pada bayi?",
    "QuestionType": "multiple_choice",
    "Options": "[\"2 bulan\",\"4 bulan\",\"6 bulan\",\"12 bulan\"]",
    "CorrectAns": "6 bulan"
  }
]
```

---

### 4. Create Quiz Submission

Submits answers for a quiz. Cadre/user ID is inferred from the JWT token.

- **Method**: `POST`
- **Path**: `/quizzes/:id/submissions`
- **Authentication**: Bearer JWT
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `score` | `number` | No | Calculated score (e.g. `100.0`) |
| `answers` | `object` / `array` | **Yes** | JSON structure storing answers |

#### Example Request

```http
POST /quizzes/01950d87-35fc-79c2-9014-464a69b76601/submissions HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "score": 100.0,
  "answers": {
    "01950d87-35fc-79c2-9014-464a69b76610": "6 bulan"
  }
}
```

#### Response (`201 Created`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76620",
  "KaderID": "01950d87-35fc-79c2-9014-464a69b76600",
  "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
  "Score": 100.0,
  "Answers": "{\"01950d87-35fc-79c2-9014-464a69b76610\":\"6 bulan\"}",
  "SubmittedAt": "2024-01-15T12:00:00Z"
}
```

---

## Healthcare Worker (`tenaga_kesehatan`) Management

### 5. Create Quiz (Nakes)

Creates a new quiz.

- **Method**: `POST`
- **Path**: `/nakes/quizzes`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Quiz title |
| `description` | `string` | No | Optional description |

#### Example Request

```http
POST /nakes/quizzes HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Modul Pencegahan Stunting Balita",
  "description": "Kuis pemahaman dasar pencegahan dan penanganan stunting"
}
```

#### Response (`201 Created`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76601",
  "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
  "Title": "Modul Pencegahan Stunting Balita",
  "Description": "Kuis pemahaman dasar pencegahan dan penanganan stunting",
  "CreatedAt": "2024-01-15T10:00:00Z",
  "UpdatedAt": "2024-01-15T10:00:00Z"
}
```

---

### 6. Update Quiz (Nakes)

Updates the title and/or description of an existing quiz.

- **Method**: `PUT`
- **Path**: `/nakes/quizzes/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Updated title |
| `description` | `string` | No | Updated description |

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76601",
  "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
  "Title": "Modul Pencegahan Stunting Balita - Revisi",
  "Description": "Deskripsi baru kuis",
  "CreatedAt": "2024-01-15T10:00:00Z",
  "UpdatedAt": "2024-01-15T11:00:00Z"
}
```

---

### 7. Delete Quiz (Nakes)

Deletes a quiz by ID.

- **Method**: `DELETE`
- **Path**: `/nakes/quizzes/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
{
  "message": "quiz deleted successfully"
}
```

---

### 8. Create Quiz Question (Nakes)

Adds a question to a quiz.

- **Method**: `POST`
- **Path**: `/nakes/quizzes/:id/questions`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `question_text` | `string` | **Yes** | Question prompt text |
| `question_type` | `string` | **Yes** | `multiple_choice`, `true_false` |
| `options` | `array` / `object` | **Yes** | JSON options list |
| `correct_ans` | `string` | No | Correct answer |

#### Example Request

```http
POST /nakes/quizzes/01950d87-35fc-79c2-9014-464a69b76601/questions HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "question_text": "Berapa lama ASI eksklusif diberikan pada bayi?",
  "question_type": "multiple_choice",
  "options": ["2 bulan", "4 bulan", "6 bulan", "12 bulan"],
  "correct_ans": "6 bulan"
}
```

#### Response (`201 Created`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76610",
  "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
  "QuestionText": "Berapa lama ASI eksklusif diberikan pada bayi?",
  "QuestionType": "multiple_choice",
  "Options": "[\"2 bulan\",\"4 bulan\",\"6 bulan\",\"12 bulan\"]",
  "CorrectAns": "6 bulan"
}
```

---

### 9. Get Quiz Question by ID (Nakes)

- **Method**: `GET`
- **Path**: `/nakes/quizzes/:id/questions/:question_id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76610",
  "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
  "QuestionText": "Berapa lama ASI eksklusif diberikan pada bayi?",
  "QuestionType": "multiple_choice",
  "Options": "[\"2 bulan\",\"4 bulan\",\"6 bulan\",\"12 bulan\"]",
  "CorrectAns": "6 bulan"
}
```

---

### 10. Update Quiz Question (Nakes)

- **Method**: `PUT`
- **Path**: `/nakes/quizzes/:id/questions/:question_id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76610",
  "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
  "QuestionText": "Berapa lama ASI eksklusif wajib diberikan pada bayi?",
  "QuestionType": "multiple_choice",
  "Options": "[\"2 bulan\",\"4 bulan\",\"6 bulan\",\"12 bulan\"]",
  "CorrectAns": "6 bulan"
}
```

---

### 11. Delete Quiz Question (Nakes)

- **Method**: `DELETE`
- **Path**: `/nakes/quizzes/:id/questions/:question_id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
{
  "message": "quiz question deleted successfully"
}
```

---

### 12. List Quiz Submissions by Quiz ID (Nakes)

Retrieves all submissions submitted for a specific quiz.

- **Method**: `GET`
- **Path**: `/nakes/quizzes/:id/submissions`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76620",
    "KaderID": "01950d87-35fc-79c2-9014-464a69b76600",
    "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
    "Score": 100.0,
    "Answers": "{\"01950d87-35fc-79c2-9014-464a69b76610\":\"6 bulan\"}",
    "SubmittedAt": "2024-01-15T12:00:00Z"
  }
]
```

---

### 13. Get Quiz Submission by ID (Nakes)

- **Method**: `GET`
- **Path**: `/nakes/quizzes/:id/submissions/:submission_id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76620",
  "KaderID": "01950d87-35fc-79c2-9014-464a69b76600",
  "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
  "Score": 100.0,
  "Answers": "{\"01950d87-35fc-79c2-9014-464a69b76610\":\"6 bulan\"}",
  "SubmittedAt": "2024-01-15T12:00:00Z"
}
```

---

### 14. Delete Quiz Submission (Nakes)

- **Method**: `DELETE`
- **Path**: `/nakes/quizzes/:id/submissions/:submission_id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Response (`200 OK`)

```json
{
  "message": "quiz submission deleted successfully"
}
```

---

## Cadre (`kader`) Endpoints

### 15. List Quiz Submissions by Kader

Retrieves all quiz submissions for the authenticated Posyandu cadre.

- **Method**: `GET`
- **Path**: `/kader/submissions`
- **Authentication**: Bearer JWT (`kader` role required)

#### Example Request

```http
GET /kader/submissions HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76620",
    "KaderID": "01950d87-35fc-79c2-9014-464a69b76600",
    "QuizID": "01950d87-35fc-79c2-9014-464a69b76601",
    "Score": 100.0,
    "Answers": "{\"01950d87-35fc-79c2-9014-464a69b76610\":\"6 bulan\"}",
    "SubmittedAt": "2024-01-15T12:00:00Z"
  }
]
```
