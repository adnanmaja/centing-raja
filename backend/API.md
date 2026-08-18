# Centing Backend API Documentation

This document describes all HTTP endpoints provided by the Centing Backend REST API, including authentication flows, request/response formats, status codes, and JSON payload examples.

---

## Table of Contents

- [Overview & Base URL](#overview--base-url)
- [Authentication & Authorization](#authentication--authorization)
  - [Roles](#roles)
  - [JWT Token Format](#jwt-token-format)
  - [Protected Requests Header](#protected-requests-header)
- [Standard Error Responses](#standard-error-responses)
- [Endpoints Summary](#endpoints-summary)
- [Endpoint Details](#endpoint-details)
  - [1. Health Check](#1-health-check)
  - [2. Register User](#2-register-user)
  - [3. Request OTP (Login)](#3-request-otp-login)
  - [4. Verify OTP (Login)](#4-verify-otp-login)
  - [5. Create Child](#5-create-child)
  - [6. List Children](#6-list-children)
  - [7. Get Child by ID](#7-get-child-by-id)
  - [8. Update Child](#8-update-child)
  - [9. Delete Child](#9-delete-child)
  - [10. Get Children by Parent](#10-get-children-by-parent)
- [Protected Routes Context](#protected-routes-context)

---

## Overview & Base URL

- **Default Local Base URL**: `http://localhost:8080`
- **Content Type**: `application/json`
- **CORS**: Enabled for all origins (`*`) with standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`).

---

## Authentication & Authorization

Authentication is passwordless and relies on a **Phone Number + OTP** (One-Time Password) mechanism.

1. The client registers once via `/register`.
2. The user initiates login by calling `/login/request-otp` with their registered phone number.
3. A 6-digit numeric OTP is generated (valid for **5 minutes**).
4. The client verifies the OTP via `/login/verify-otp`.
5. Upon successful verification, the API issues a **JWT Bearer Token** (valid for **24 hours**).

### Roles

The system recognizes three predefined user roles:

| Role Name | Value in API / Database | Description |
| :--- | :--- | :--- |
| **Tenaga Kesehatan** | `tenaga_kesehatan` | Healthcare worker / Medical staff |
| **Kader** | `kader` | Community health cadre / Posyandu volunteer |
| **Orang Tua** | `orang_tua` | Parent / Guardian |

### JWT Token Format

The JWT is signed using **HMAC SHA256** (`HS256`) and contains the following payload claims:

```json
{
  "user_id": "01950d87-35fc-79c2-9014-464a69b76615",
  "phone_number": "+6281234567890",
  "role": "kader",
  "iss": "centing",
  "iat": 1740000000,
  "nbf": 1740000000,
  "exp": 1740086400
}
```

### Protected Requests Header

Protected endpoints require the JWT in the `Authorization` header:

```http
Authorization: Bearer <jwt_token_here>
```

---

## Standard Error Responses

Errors return JSON formatted with an `error` message string:

```json
{
  "error": "description of the error"
}
```

Common HTTP status codes:

| Status Code | Reason |
| :--- | :--- |
| `200 OK` | Request succeeded |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Validation failure, missing required fields, or invalid format |
| `401 Unauthorized` | Invalid/expired token, wrong OTP, or expired OTP |
| `404 Not Found` | User or resource does not exist |
| `409 Conflict` | Unique constraint violation (e.g. phone number already registered) |
| `500 Internal Server Error` | Unexpected server-side error |

---

## Endpoints Summary
| Method | Endpoint | Auth Required | Allowed Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | No | Any | Server health check |
| `POST` | `/register` | No | Any | Register a new user |
| `POST` | `/login/request-otp` | No | Any | Request a login OTP code |
| `POST` | `/login/verify-otp` | No | Any | Verify OTP code and obtain JWT token |
| `POST` | `/children` | Yes (JWT) | All authenticated roles | Register child data |
| `GET` | `/children` | Yes (JWT) | All authenticated roles | List children with pagination |
| `GET` | `/children/:id` | Yes (JWT) | All authenticated roles | Get child by ID |
| `PUT` | `/children/:id` | Yes (JWT) | All authenticated roles | Update child data |
| `DELETE` | `/children/:id` | Yes (JWT) | All authenticated roles | Delete child by ID |
| `GET` | `/ortu/child` | Yes (JWT) | `orang_tua` | Get children for the authenticated parent |
| `GET` | `/nakes/dashboard` | Yes (JWT) | `tenaga_kesehatan` | Healthcare worker protected endpoint |
| `GET` | `/kader`/* | Yes (JWT) | `kader` | Posyandu cadre protected endpoint |
| `GET` | `/ortu`/* | Yes (JWT) | `orang_tua` | Parents/guardians protected endpoint |
## Endpoint Details

### 1. Health Check

Checks if the service is running and healthy.

- **Method**: `GET`
- **Path**: `/`
- **Authentication**: None

#### Request

```http
GET / HTTP/1.1
Host: localhost:8080
```

#### Response (`200 OK`)

```json
{
  "status": "aman"
}
```

---

### 2. Register User

Registers a new user in the database.

- **Method**: `POST`
- **Path**: `/register`
- **Authentication**: None
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Allowed Values / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `string` | **Yes** | 1–256 characters | Full name of the user |
| `phone_number` | `string` | **Yes** | Unique string | User's phone number |
| `role` | `string` | **Yes** | `tenaga_kesehatan`, `kader`, `orang_tua` | Role assigned to the user |

#### Example Request

```http
POST /register HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "name": "Siti Aminah",
  "phone_number": "+6281234567890",
  "role": "kader"
}
```

#### Response Examples

##### Success (`201 Created`)
```json
{
  "id": "01950d87-35fc-79c2-9014-464a69b76615",
  "name": "Siti Aminah",
  "phone_number": "+6281234567890",
  "role": "kader"
}
```

##### Validation Error (`400 Bad Request`)
```json
{
  "error": "Key: 'RegisterRequest.Role' Error:Field validation for 'Role' failed on the 'oneof' tag"
}
```

##### Duplicate User (`409 Conflict`)
```json
{
  "error": "user already exists"
}
```

---

### 3. Request OTP (Login)

Requests a 6-digit OTP code for an existing user by phone number.

- **Method**: `POST`
- **Path**: `/login/request-otp`
- **Authentication**: None
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `phone_number` | `string` | **Yes** | Registered user's phone number |

#### Example Request

```http
POST /login/request-otp HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "phone_number": "+6281234567890"
}
```

#### Response Examples

##### Success (`200 OK`)
```json
{
  "message": "OTP Sent. 492015"
}
```
> *Note*: The generated 6-digit OTP is currently included in the message response for development testing. It expires after **5 minutes**.

##### User Not Found (`404 Not Found`)
```json
{
  "error": "user not found"
}
```

##### Missing Phone Number (`400 Bad Request`)
```json
{
  "error": "Key: 'RequestOTPRequest.PhoneNumber' Error:Field validation for 'PhoneNumber' failed on the 'required' tag"
}
```

---

### 4. Verify OTP (Login)

Validates the submitted OTP against the phone number and issues a JWT token.

- **Method**: `POST`
- **Path**: `/login/verify-otp`
- **Authentication**: None
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `phone_number` | `string` | **Yes** | Registered phone number |
| `otp` | `string` | **Yes** | 6-digit OTP received from request-otp |

#### Example Request

```http
POST /login/verify-otp HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "phone_number": "+6281234567890",
  "otp": "492015"
}
```

#### Response Examples

##### Success (`200 OK`)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDE5NTBkODctMzVmYy03OWMyLTkwMTQtNDY0YTY5Yjc2NjE1IiwicGhvbmVfbnVtYmVyIjoiKzYyODEyMzQ1Njc4OTAiLCJyb2xlIjoia2FkZXIiLCJpc3MiOiJjZW50aW5nIiwiZXhwIjoxNzQwMDg2NDAwLCJuYmYiOjE3NDAwMDAwMDAsImlhdCI6MTc0MDAwMDAwMH0.signature_sample_here",
  "user": {
    "id": "01950d87-35fc-79c2-9014-464a69b76615",
    "name": "Siti Aminah",
    "phone_number": "+6281234567890",
    "role": "kader"
  }
}
```

##### Invalid OTP or Phone Number (`401 Unauthorized`)
```json
{
  "error": "invalid phone number or OTP"
}
```

##### Expired OTP (`401 Unauthorized`)
```json
{
  "error": "OTP expired"
}
```

##### Missing Required Fields (`400 Bad Request`)
```json
{
  "error": "Key: 'VerifyOTPRequest.OTP' Error:Field validation for 'OTP' failed on the 'required' tag"
}

---

### 5. Create Child

Registers a new child associated with the authenticated parent.

- **Method**: `POST`
- **Path**: `/children`
- **Authentication**: Bearer JWT

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `nik` | `string` | **Yes** | Child's National Identity Number (NIK) |
| `full_name` | `string` | **Yes** | Child's full name |
| `gender` | `string` | **Yes** | Child's gender (`L` / `P`) |
| `birth_date` | `string` (RFC3339) | **Yes** | Birth date (e.g. `2023-01-15T00:00:00Z`) |
| `home_address` | `string` | **Yes** | Home address |

#### Example Request

```http
POST /children HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "nik": "3201234567890001",
  "full_name": "Budi Santoso",
  "gender": "L",
  "birth_date": "2023-01-15T00:00:00Z",
  "home_address": "Jl. Mawar No. 12, RT 01/RW 02"
}
```

#### Response (`201 Created`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76615",
  "ParentID": "01950d87-35fc-79c2-9014-464a69b76610",
  "Nik": "3201234567890001",
  "FullName": "Budi Santoso",
  "Gender": "L",
  "BirthDate": "2023-01-15T00:00:00Z",
  "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
  "CreatedAt": "2024-01-01T00:00:00Z",
  "UpdatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 6. List Children

Retrieves a paginated list of children.

- **Method**: `GET`
- **Path**: `/children`
- **Authentication**: Bearer JWT
- **Query Parameters**:
  - `limit` (optional, default: `10`): Number of records to return.
  - `offset` (optional, default: `0`): Number of records to skip.

#### Example Request

```http
GET /children?limit=10&offset=0 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76615",
    "ParentID": "01950d87-35fc-79c2-9014-464a69b76610",
    "Nik": "3201234567890001",
    "FullName": "Budi Santoso",
    "Gender": "L",
    "BirthDate": "2023-01-15T00:00:00Z",
    "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
    "CreatedAt": "2024-01-01T00:00:00Z",
    "UpdatedAt": "2024-01-01T00:00:00Z"
  }
]
```

---

### 7. Get Child by ID

Fetches details of a specific child by their UUID.

- **Method**: `GET`
- **Path**: `/children/:id`
- **Authentication**: Bearer JWT

#### Example Request

```http
GET /children/01950d87-35fc-79c2-9014-464a69b76615 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76615",
  "ParentID": "01950d87-35fc-79c2-9014-464a69b76610",
  "Nik": "3201234567890001",
  "FullName": "Budi Santoso",
  "Gender": "L",
  "BirthDate": "2023-01-15T00:00:00Z",
  "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
  "CreatedAt": "2024-01-01T00:00:00Z",
  "UpdatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 8. Update Child

Updates data of an existing child.

- **Method**: `PUT`
- **Path**: `/children/:id`
- **Authentication**: Bearer JWT

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `nik` | `string` | **Yes** | Updated National Identity Number (NIK) |
| `full_name` | `string` | **Yes** | Updated child full name |
| `gender` | `string` | **Yes** | Updated gender (`L` / `P`) |
| `birth_date` | `string` (RFC3339) | **Yes** | Updated birth date |
| `home_address` | `string` | **Yes** | Updated home address |

#### Example Request

```http
PUT /children/01950d87-35fc-79c2-9014-464a69b76615 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "nik": "3201234567890001",
  "full_name": "Budi Santoso Updated",
  "gender": "L",
  "birth_date": "2023-01-15T00:00:00Z",
  "home_address": "Jl. Anggrek No. 5, RT 02/RW 03"
}
```

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76615",
  "ParentID": "01950d87-35fc-79c2-9014-464a69b76610",
  "Nik": "3201234567890001",
  "FullName": "Budi Santoso Updated",
  "Gender": "L",
  "BirthDate": "2023-01-15T00:00:00Z",
  "HomeAddress": "Jl. Anggrek No. 5, RT 02/RW 03",
  "CreatedAt": "2024-01-01T00:00:00Z",
  "UpdatedAt": "2024-01-02T00:00:00Z"
}
```

---

### 9. Delete Child

Deletes a child record by ID.

- **Method**: `DELETE`
- **Path**: `/children/:id`
- **Authentication**: Bearer JWT

#### Example Request

```http
DELETE /children/01950d87-35fc-79c2-9014-464a69b76615 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "child deleted successfully"
}
```

---

### 10. Get Children by Parent

Retrieves all children registered by the currently authenticated parent.

- **Method**: `GET`
- **Path**: `/ortu/child`
- **Authentication**: Bearer JWT (Role: `orang_tua`)

#### Example Request

```http
GET /ortu/child HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76615",
    "ParentID": "01950d87-35fc-79c2-9014-464a69b76610",
    "Nik": "3201234567890001",
    "FullName": "Budi Santoso",
    "Gender": "L",
    "BirthDate": "2023-01-15T00:00:00Z",
    "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
    "CreatedAt": "2024-01-01T00:00:00Z",
    "UpdatedAt": "2024-01-01T00:00:00Z"
  }
]
```

---

## Protected Routes Context

When accessing routes protected by `AuthMiddleware`, supply the Bearer token:

```http
GET /api/v1/some-protected-route HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

### Context Variables Injected by Middleware

Inside handlers on protected routes, Gin's context (`*gin.Context`) exposes:

| Context Key | Type | Description |
| :--- | :--- | :--- |
| `user_id` | `string` | User's UUID string |
| `phone` | `string` | User's phone number |
| `role` | `db.Roles` | User's role enum (`tenaga_kesehatan`, `kader`, `orang_tua`) |

### Middleware Error Responses

- **Missing Authorization Header (`401 Unauthorized`)**:
  ```json
  {
    "error": "No authorization header"
  }
  ```
- **Malformed Header (`401 Unauthorized`)**:
  ```json
  {
    "error": "Invalid token format"
  }
  ```
- **Expired or Invalid JWT (`401 Unauthorized`)**:
  ```json
  {
    "error": "Invalid or expired token"
  }
  ```

---

## Role-Based Route Protection

Use `RequireRole` to restrict route groups or single endpoints to specific user roles:

```go
// Tenaga Kesehatan only
nakes := protected.Group("/nakes")
nakes.Use(RequireRole(db.UserRoleTenagaKesehatan))

// Kader only
kader := protected.Group("/kader")
kader.Use(RequireRole(db.UserRoleKader))

// Orang Tua only
orangTua := protected.Group("/orang-tua")
orangTua.Use(RequireRole(db.UserRoleOrangTua))

// Multiple allowed roles
staff := protected.Group("/staff")
staff.Use(RequireRole(db.UserRoleTenagaKesehatan, db.UserRoleKader))
```

### Role Error Response

When a user with an unauthorized role accesses a restricted endpoint:

- **Status**: `403 Forbidden`
- **Body**:
  ```json
  {
    "error": "Forbidden: insufficient permissions"
  }
  ```
