# Centing API Documentation

Welcome to the Centing Backend REST API documentation.

---

## ⚡ Interactive OpenAPI / Swagger UI

Interactive documentation with live request execution ("Try it out") and JSON schema exports is available directly on the server:

- **Swagger UI**: [`http://localhost:8080/swagger/index.html`](http://localhost:8080/swagger/index.html)
- **OpenAPI 2.0 Spec (JSON)**: [`http://localhost:8080/swagger/doc.json`](http://localhost:8080/swagger/doc.json) or [`docs/swagger.json`](swagger.json)
- **OpenAPI 2.0 Spec (YAML)**: [`docs/swagger.yaml`](swagger.yaml)

---

## 📚 API Modules

| Module | Description | Endpoints Covered |
| :--- | :--- | :--- |
| 🔐 **[Authentication & User Management](auth.md)** | Phone-based passwordless OTP login, registration, and JWT tokens. | `GET /`, `POST /register`, `POST /login/request-otp`, `POST /login/verify-otp` |
| 👶 **[Children Management](children.md)** | Child profiles, demographic data, and parent-child associations. | `POST/GET/PUT/DELETE /nakes/children`, `GET /ortu/child` |
| 📏 **[Measurements & Growth Tracking](measurements.md)** | Child anthropometric measurements (height, weight, LiLA, head circumference) & history. | `POST/GET/PUT/DELETE /nakes/measurements`, `GET /nakes/children/:id/measurements`, `GET /ortu/children/:id/measurements` |
| 📚 **[Education Materials](education_materials.md)** | Stunting prevention modules, nutrition guidelines, and video lectures. | `GET /education-materials`, `POST/PUT/DELETE /nakes/education-materials` |
| 📝 **[Quizzes & Submissions](quiz.md)** | Educational quizzes, question management, and kader quiz submissions tracking. | `GET/POST /quizzes`, `POST/GET/PUT/DELETE /nakes/quizzes`, `GET /kader/submissions` |
| 🔔 **[Notifications](notifications.md)** | System & nakes broadcast alerts, reminders, and unread tracking. | `GET /notifications`, `PATCH /notifications/:id/read`, `POST/DELETE /nakes/notifications` |
| 🛡️ **[Middleware & Role-Based Access Control](middleware.md)** | JWT verification, Gin context injection, and role enforcement (`RequireRole`). | Middleware details, context keys, `401`/`403` error payloads |

---

## 🌐 Overview & Base URL

- **Default Local Base URL**: `http://localhost:8080`
- **Content Type**: `application/json`
- **CORS**: Enabled for all origins (`*`) with HTTP methods `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

---

## 👥 User Roles

The system supports three distinct user roles:

| Role Name | Database Value | Description |
| :--- | :--- | :--- |
| **Tenaga Kesehatan** | `tenaga_kesehatan` | Healthcare worker / Medical staff with full clinical & content access |
| **Kader** | `kader` | Community Posyandu cadre / volunteer taking quizzes |
| **Orang Tua** | `orang_tua` | Parent or guardian viewing their registered children and growth charts |

---

## 🔒 Protected Requests

Protected endpoints require a valid JWT passed via the `Authorization` HTTP header:

```http
Authorization: Bearer <jwt_token_here>
```

---

## ⚠️ Standard Error Responses

All API errors return JSON formatted with an `error` message string:

```json
{
  "error": "description of the error"
}
```

### Common HTTP Status Codes

| Status Code | Reason |
| :--- | :--- |
| `200 OK` | Request succeeded |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Validation failure, missing required fields, or invalid format |
| `401 Unauthorized` | Missing/invalid/expired token or incorrect OTP |
| `403 Forbidden` | Insufficient role permissions for the endpoint |
| `404 Not Found` | Requested user or resource does not exist |
| `409 Conflict` | Unique constraint violation (e.g. phone number already registered) |
| `500 Internal Server Error` | Unexpected server-side failure |

---

## 📋 Endpoints Quick Reference

| Method | Endpoint | Auth Required | Allowed Roles | Module |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | No | Any | [Auth & Core](auth.md#1-health-check) |
| `GET` | `/swagger/*any` | No | Any | [Swagger UI](README.md#interactive-openapi--swagger-ui) |
| `POST` | `/register` | No | Any | [Auth & Core](auth.md#2-register-user) |
| `POST` | `/login/request-otp` | No | Any | [Auth & Core](auth.md#3-request-otp-login) |
| `POST` | `/login/verify-otp` | No | Any | [Auth & Core](auth.md#4-verify-otp-login) |
| `GET` | `/education-materials` | Yes (JWT) | All authenticated roles | [Education Materials](education_materials.md#1-list-education-materials) |
| `GET` | `/education-materials/:id` | Yes (JWT) | All authenticated roles | [Education Materials](education_materials.md#2-get-education-material-by-id) |
| `GET` | `/quizzes` | Yes (JWT) | All authenticated roles | [Quizzes](quiz.md#1-list-quizzes) |
| `GET` | `/quizzes/:id` | Yes (JWT) | All authenticated roles | [Quizzes](quiz.md#2-get-quiz-by-id) |
| `GET` | `/quizzes/:id/questions` | Yes (JWT) | All authenticated roles | [Quizzes](quiz.md#3-list-quiz-questions-by-quiz-id) |
| `POST` | `/quizzes/:id/submissions` | Yes (JWT) | All authenticated roles | [Quizzes](quiz.md#4-create-quiz-submission) |
| `GET` | `/notifications` | Yes (JWT) | All authenticated roles | [Notifications](notifications.md#1-list-user-notifications) |
| `GET` | `/notifications/:id` | Yes (JWT) | All authenticated roles | [Notifications](notifications.md#2-get-notification-by-id) |
| `PATCH` | `/notifications/:id/read` | Yes (JWT) | All authenticated roles | [Notifications](notifications.md#3-mark-notification-as-read) |
| `POST` | `/nakes/children` | Yes (JWT) | `tenaga_kesehatan` | [Children](children.md#1-create-child-nakes) |
| `GET` | `/nakes/children` | Yes (JWT) | `tenaga_kesehatan` | [Children](children.md#2-list-all-children-nakes) |
| `GET` | `/nakes/children/:id` | Yes (JWT) | `tenaga_kesehatan` | [Children](children.md#3-get-child-by-id-nakes) |
| `PUT` | `/nakes/children/:id` | Yes (JWT) | `tenaga_kesehatan` | [Children](children.md#4-update-child-nakes) |
| `DELETE` | `/nakes/children/:id` | Yes (JWT) | `tenaga_kesehatan` | [Children](children.md#5-delete-child-nakes) |
| `GET` | `/nakes/children/:id/measurements` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#4-list-measurements-by-child-id-nakes--ortu) |
| `GET` | `/nakes/measurements` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#2-get-measurements-by-measurer-nakes) |
| `POST` | `/nakes/measurements` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#1-create-measurement-nakes) |
| `GET` | `/nakes/measurements/:id` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#3-get-measurement-by-id-nakes) |
| `PUT` | `/nakes/measurements/:id` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#5-update-measurement-nakes) |
| `DELETE` | `/nakes/measurements/:id` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#6-delete-measurement-nakes) |
| `POST` | `/nakes/education-materials` | Yes (JWT) | `tenaga_kesehatan` | [Education Materials](education_materials.md#3-create-education-material-nakes) |
| `PUT` | `/nakes/education-materials/:id` | Yes (JWT) | `tenaga_kesehatan` | [Education Materials](education_materials.md#4-update-education-material-nakes) |
| `DELETE` | `/nakes/education-materials/:id` | Yes (JWT) | `tenaga_kesehatan` | [Education Materials](education_materials.md#5-delete-education-material-nakes) |
| `POST` | `/nakes/quizzes` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#5-create-quiz-nakes) |
| `PUT` | `/nakes/quizzes/:id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#6-update-quiz-nakes) |
| `DELETE` | `/nakes/quizzes/:id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#7-delete-quiz-nakes) |
| `POST` | `/nakes/quizzes/:id/questions` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#8-create-quiz-question-nakes) |
| `GET` | `/nakes/quizzes/:id/questions/:question_id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#9-get-quiz-question-by-id-nakes) |
| `PUT` | `/nakes/quizzes/:id/questions/:question_id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#10-update-quiz-question-nakes) |
| `DELETE` | `/nakes/quizzes/:id/questions/:question_id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#11-delete-quiz-question-nakes) |
| `GET` | `/nakes/quizzes/:id/submissions` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#12-list-quiz-submissions-by-quiz-id-nakes) |
| `GET` | `/nakes/quizzes/:id/submissions/:submission_id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#13-get-quiz-submission-by-id-nakes) |
| `DELETE` | `/nakes/quizzes/:id/submissions/:submission_id` | Yes (JWT) | `tenaga_kesehatan` | [Quizzes](quiz.md#14-delete-quiz-submission-nakes) |
| `POST` | `/nakes/notifications` | Yes (JWT) | `tenaga_kesehatan` | [Notifications](notifications.md#4-create-notification-nakes) |
| `DELETE` | `/nakes/notifications/:id` | Yes (JWT) | `tenaga_kesehatan` | [Notifications](notifications.md#5-delete-notification-nakes) |
| `GET` | `/kader/submissions` | Yes (JWT) | `kader` | [Quizzes](quiz.md#15-list-quiz-submissions-by-kader) |
| `GET` | `/ortu/child` | Yes (JWT) | `orang_tua` | [Children](children.md#6-get-children-by-parent-orang-tua) |
| `GET` | `/ortu/children/:id/measurements` | Yes (JWT) | `orang_tua` | [Measurements](measurements.md#4-list-measurements-by-child-id-nakes--ortu) |
