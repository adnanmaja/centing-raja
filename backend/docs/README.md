# Centing API Documentation

Welcome to the Centing Backend REST API documentation. The documentation is organized into modular documents based on functional domain/concern:

---

## 📚 API Modules

| Module | Description | Endpoints Covered |
| :--- | :--- | :--- |
| 🔐 **[Authentication & User Management](auth.md)** | Phone-based passwordless OTP login, registration, and JWT tokens. | `GET /`, `POST /register`, `POST /login/request-otp`, `POST /login/verify-otp` |
| 👶 **[Children Management](children.md)** | Child profiles, demographic data, and parent-child associations. | `POST /children`, `GET /children`, `GET /children/:id`, `PUT /children/:id`, `DELETE /children/:id`, `GET /ortu/child` |
| 📏 **[Measurements & Growth Tracking](measurements.md)** | Child anthropometric measurements (height, weight, head/arm circumference) & history. | `POST /measurements`, `GET /measurements`, `GET /measurements/:id`, `GET /:role/children/:id/measurements`, `PUT /measurements/:id`, `DELETE /measurements/:id` |
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
| **Tenaga Kesehatan** | `tenaga_kesehatan` | Healthcare worker / Medical staff with access to medical records |
| **Kader** | `kader` | Community Posyandu cadre / volunteer recording measurements |
| **Orang Tua** | `orang_tua` | Parent or guardian viewing their registered children |

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
| `POST` | `/register` | No | Any | [Auth & Core](auth.md#2-register-user) |
| `POST` | `/login/request-otp` | No | Any | [Auth & Core](auth.md#3-request-otp-login) |
| `POST` | `/login/verify-otp` | No | Any | [Auth & Core](auth.md#4-verify-otp-login) |
| `POST` | `/children` | Yes (JWT) | All authenticated roles | [Children](children.md#1-create-child) |
| `GET` | `/children` | Yes (JWT) | All authenticated roles | [Children](children.md#2-list-children) |
| `GET` | `/children/:id` | Yes (JWT) | All authenticated roles | [Children](children.md#3-get-child-by-id) |
| `PUT` | `/children/:id` | Yes (JWT) | All authenticated roles | [Children](children.md#4-update-child) |
| `DELETE` | `/children/:id` | Yes (JWT) | All authenticated roles | [Children](children.md#5-delete-child) |
| `GET` | `/ortu/child` | Yes (JWT) | `orang_tua` | [Children](children.md#6-get-children-by-parent) |
| `POST` | `/measurements` | Yes (JWT) | All authenticated roles | [Measurements](measurements.md#1-create-measurement) |
| `GET` | `/measurements` | Yes (JWT) | All authenticated roles | [Measurements](measurements.md#2-get-measurements-by-measurer) |
| `GET` | `/measurements/:id` | Yes (JWT) | All authenticated roles | [Measurements](measurements.md#3-get-measurement-by-id) |
| `GET` | `/nakes/children/:id/measurements` | Yes (JWT) | `tenaga_kesehatan` | [Measurements](measurements.md#4-list-measurements-by-child-id) |
| `GET` | `/ortu/children/:id/measurements` | Yes (JWT) | `orang_tua` | [Measurements](measurements.md#4-list-measurements-by-child-id) |
| `PUT` | `/measurements/:id` | Yes (JWT) | All authenticated roles | [Measurements](measurements.md#5-update-measurement) |
| `DELETE` | `/measurements/:id` | Yes (JWT) | All authenticated roles | [Measurements](measurements.md#6-delete-measurement) |
