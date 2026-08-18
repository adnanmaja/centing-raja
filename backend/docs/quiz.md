# Quizzes, Questions & Submissions API

This document details all endpoints for managing educational quizzes, questions, and kader submissions in Centing.

---

## 📖 Overview

The quiz module allows educators and staff to create quizzes with structured questions and track kader learning progress and quiz submissions.

- **Quiz Management**: Create, list with pagination, retrieve, update, and delete quizzes.
- **Question Management**: Add questions (with type and JSON-encoded options), retrieve, update, and delete questions linked to a quiz.
- **Submission Tracking**: Record quiz answers and scores submitted by Posyandu cadres (`kader`), list submissions per quiz or per cadre.
- All endpoints require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 📌 Endpoints

### Quizzes
- [1. Create Quiz](#1-create-quiz)
- [2. List Quizzes](#2-list-quizzes)
- [3. Get Quiz by ID](#3-get-quiz-by-id)
- [4. Update Quiz](#4-update-quiz)
- [5. Delete Quiz](#5-delete-quiz)

### Quiz Questions
- [6. Create Quiz Question](#6-create-quiz-question)
- [7. List Quiz Questions by Quiz ID](#7-list-quiz-questions-by-quiz-id)
- [8. Get Quiz Question by ID](#8-get-quiz-question-by-id)
- [9. Update Quiz Question](#9-update-quiz-question)
- [10. Delete Quiz Question](#10-delete-quiz-question)

### Quiz Submissions
- [11. Create Quiz Submission](#11-create-quiz-submission)
- [12. List Quiz Submissions by Quiz ID](#12-list-quiz-submissions-by-quiz-id)
- [13. Get Quiz Submission by ID](#13-get-quiz-submission-by-id)
- [14. List Quiz Submissions by Kader](#14-list-quiz-submissions-by-kader)
- [15. Delete Quiz Submission](#15-delete-quiz-submission)

---

## Quizzes

### 1. Create Quiz

Creates a new quiz. The creator is automatically set from the authenticated user's JWT.

- **Method**: `POST`
- **Path**: `/quizzes`
- **Authentication**: Bearer JWT (All authenticated roles)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Quiz title |
| `description` | `string` | No | Optional description / instructions |

#### Example Request

```http
POST /quizzes HTTP/1.1
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

### 2. List Quizzes

Retrieves a paginated list of quizzes sorted newest first.

- **Method**: `GET`
- **Path**: `/quizzes`
- **Authentication**: Bearer JWT (All authenticated roles)
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

### 3. Get Quiz by ID

Retrieves details of a single quiz by its UUID.

- **Method**: `GET`
- **Path**: `/quizzes/:id`
- **Authentication**: Bearer JWT (All authenticated roles)

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

### 4. Update Quiz

Updates the title and/or description of an existing quiz.

- **Method**: `PUT`
- **Path**: `/quizzes/:id`
- **Authentication**: Bearer JWT (All authenticated roles)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Updated title |
| `description` | `string` | No | Updated description |

#### Example Request

```http
PUT /quizzes/01950d87-35fc-79c2-9014-464a69b76601 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Modul Pencegahan Stunting Balita - Revisi",
  "description": "Deskripsi baru kuis"
}
```

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

### 5. Delete Quiz

Deletes a quiz and cascades to all its associated questions and submissions.

- **Method**: `DELETE`
- **Path**: `/quizzes/:id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
DELETE /quizzes/01950d87-35fc-79c2-9014-464a69b76601 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "quiz deleted successfully"
}
```

---

## Quiz Questions

### 6. Create Quiz Question

Adds a question to a quiz.

- **Method**: `POST`
- **Path**: `/quizzes/:id/questions`
- **Authentication**: Bearer JWT (All authenticated roles)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `question_text` | `string` | **Yes** | The question prompt text |
| `question_type` | `string` | **Yes** | `multiple_choice`, `true_false`, `essay` |
| `options` | `array` / `object` | **Yes** | JSON options list (e.g. `["A", "B", "C", "D"]`) |
| `correct_ans` | `string` | No | Correct answer string/key |

#### Example Request

```http
POST /quizzes/01950d87-35fc-79c2-9014-464a69b76601/questions HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "question_text": "Berapa lama ASI eksklusif diberikan pada bayi?",
  "question_type": "multiple_choice",
  "options": [
    "2 bulan",
    "4 bulan",
    "6 bulan",
    "12 bulan"
  ],
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

### 7. List Quiz Questions by Quiz ID

Retrieves all questions belonging to a quiz.

- **Method**: `GET`
- **Path**: `/quizzes/:id/questions`
- **Authentication**: Bearer JWT (All authenticated roles)

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

### 8. Get Quiz Question by ID

Retrieves a single quiz question.

- **Method**: `GET`
- **Path**: `/quizzes/:id/questions/:question_id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
GET /quizzes/01950d87-35fc-79c2-9014-464a69b76601/questions/01950d87-35fc-79c2-9014-464a69b76610 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

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

### 9. Update Quiz Question

Updates a question's text, type, options, or correct answer.

- **Method**: `PUT`
- **Path**: `/quizzes/:id/questions/:question_id`
- **Authentication**: Bearer JWT (All authenticated roles)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `question_text` | `string` | **Yes** | Updated question text |
| `question_type` | `string` | **Yes** | Updated question type |
| `options` | `array` / `object` | **Yes** | Updated JSON options |
| `correct_ans` | `string` | No | Updated correct answer |

#### Example Request

```http
PUT /quizzes/01950d87-35fc-79c2-9014-464a69b76601/questions/01950d87-35fc-79c2-9014-464a69b76610 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "question_text": "Berapa lama ASI eksklusif wajib diberikan pada bayi?",
  "question_type": "multiple_choice",
  "options": [
    "2 bulan",
    "4 bulan",
    "6 bulan",
    "12 bulan"
  ],
  "correct_ans": "6 bulan"
}
```

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

### 10. Delete Quiz Question

Deletes a quiz question by its UUID.

- **Method**: `DELETE`
- **Path**: `/quizzes/:id/questions/:question_id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
DELETE /quizzes/01950d87-35fc-79c2-9014-464a69b76601/questions/01950d87-35fc-79c2-9014-464a69b76610 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "quiz question deleted successfully"
}
```

---

## Quiz Submissions

### 11. Create Quiz Submission

Submits answers for a quiz. Cadre ID is inferred from the authenticated user's JWT.

- **Method**: `POST`
- **Path**: `/quizzes/:id/submissions`
- **Authentication**: Bearer JWT (All authenticated roles / `kader`)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `score` | `number` | No | Submission score (e.g. `85.0`) |
| `answers` | `object` / `array` | **Yes** | JSON structure storing user answers |

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

### 12. List Quiz Submissions by Quiz ID

Retrieves all submissions submitted for a specific quiz.

- **Method**: `GET`
- **Path**: `/quizzes/:id/submissions`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
GET /quizzes/01950d87-35fc-79c2-9014-464a69b76601/submissions HTTP/1.1
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

---

### 13. Get Quiz Submission by ID

Retrieves a single submission by its UUID.

- **Method**: `GET`
- **Path**: `/quizzes/:id/submissions/:submission_id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
GET /quizzes/01950d87-35fc-79c2-9014-464a69b76601/submissions/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

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

### 14. List Quiz Submissions by Kader

Retrieves all submissions submitted by the currently authenticated kader.

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

---

### 15. Delete Quiz Submission

Deletes a quiz submission by its UUID.

- **Method**: `DELETE`
- **Path**: `/quizzes/:id/submissions/:submission_id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
DELETE /quizzes/01950d87-35fc-79c2-9014-464a69b76601/submissions/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "quiz submission deleted successfully"
}
```
