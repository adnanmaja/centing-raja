# Authentication & Core API

This document details the authentication and core endpoints of the Centing Backend REST API, covering user registration, phone-based passwordless OTP login, and JWT verification.

---

## 📖 Overview

Centing uses a passwordless authentication flow via **Phone Number + OTP (One-Time Password)**:

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client
    participant API as Centing Backend

    User->>Client: Enter Phone Number
    Client->>API: POST /login/request-otp {"phone_number": "+62812..."}
    API-->>Client: 200 OK {"message": "OTP Sent. 123456"} (valid 5 min)
    User->>Client: Enter 6-digit OTP
    Client->>API: POST /login/verify-otp {"phone_number": "...", "otp": "123456"}
    API-->>Client: 200 OK {"token": "<JWT>", "user": {...}} (valid 24h)
    Client->>API: Authenticated Request (Header: Authorization: Bearer <JWT>)
```

1. **Register**: New users register with name, phone number, and a predefined role via `POST /register`.
2. **Request OTP**: Call `POST /login/request-otp` to generate a 6-digit OTP code (valid for **5 minutes**).
3. **Verify OTP**: Submit the OTP via `POST /login/verify-otp` to receive a signed **JWT Bearer Token** (valid for **24 hours**).

---

## 👥 Roles

| Role Name | Value in API / Database | Description |
| :--- | :--- | :--- |
| **Tenaga Kesehatan** | `tenaga_kesehatan` | Healthcare worker / Medical staff |
| **Kader** | `kader` | Community health cadre / Posyandu volunteer |
| **Orang Tua** | `orang_tua` | Parent / Guardian |

---

## 🔑 JWT Token Format

The JWT is signed using **HMAC SHA256** (`HS256`) and contains the following claims:

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

---

## 📌 Endpoints

- [1. Health Check](#1-health-check)
- [2. Register User](#2-register-user)
- [3. Request OTP (Login)](#3-request-otp-login)
- [4. Verify OTP (Login)](#4-verify-otp-login)

---

### 1. Health Check

Checks if the API service is running and healthy.

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

Registers a new user in the system.

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

> **Note**: During development, the generated 6-digit OTP is returned in the response message. It expires after **5 minutes**.

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
```
