# Children Management API

This document details all endpoints for managing child profiles and records in Centing.

---

## 📖 Overview

Child management allows authenticated healthcare workers (`tenaga_kesehatan`) to register, retrieve, update, and remove child records, while parents (`orang_tua`) can view their own registered children.

- All endpoints in this module require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```
- Endpoints prefixed with `/nakes` require the `tenaga_kesehatan` role.
- Endpoints prefixed with `/ortu` require the `orang_tua` role.

---

## 📌 Endpoints

- [1. Create Child (Nakes)](#1-create-child-nakes)
- [2. List All Children (Nakes)](#2-list-all-children-nakes)
- [3. Get Child by ID (Nakes)](#3-get-child-by-id-nakes)
- [4. Update Child (Nakes)](#4-update-child-nakes)
- [5. Delete Child (Nakes)](#5-delete-child-nakes)
- [6. Get Children by Parent (Orang Tua)](#6-get-children-by-parent-orang-tua)

---

### 1. Create Child (Nakes)

Registers a new child associated with the user ID in the JWT token.

- **Method**: `POST`
- **Path**: `/nakes/children`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `nik` | `string` | **Yes** | Child's National Identity Number (NIK) |
| `full_name` | `string` | **Yes** | Child's full name |
| `gender` | `string` | **Yes** | Child's gender (`L` for Male / `P` for Female) |
| `birth_date` | `string` (RFC3339) | **Yes** | Child's birth date (e.g. `2023-01-15T00:00:00Z`) |
| `home_address` | `string` | **Yes** | Child's home address |

#### Example Request

```http
POST /nakes/children HTTP/1.1
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
  "BirthDate": "2023-01-15",
  "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
  "CreatedAt": "2024-01-01T00:00:00Z",
  "UpdatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 2. List All Children (Nakes)

Retrieves a paginated list of all children registered in the system.

- **Method**: `GET`
- **Path**: `/nakes/children`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Query Parameters**:
  - `limit` (optional, default: `10`): Number of records to return.
  - `offset` (optional, default: `0`): Number of records to skip.

#### Example Request

```http
GET /nakes/children?limit=10&offset=0 HTTP/1.1
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
    "BirthDate": "2023-01-15",
    "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
    "CreatedAt": "2024-01-01T00:00:00Z",
    "UpdatedAt": "2024-01-01T00:00:00Z"
  }
]
```

---

### 3. Get Child by ID (Nakes)

Fetches full details of a specific child by their UUID.

- **Method**: `GET`
- **Path**: `/nakes/children/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
GET /nakes/children/01950d87-35fc-79c2-9014-464a69b76615 HTTP/1.1
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
  "BirthDate": "2023-01-15",
  "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
  "CreatedAt": "2024-01-01T00:00:00Z",
  "UpdatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 4. Update Child (Nakes)

Updates the demographic and profile information of an existing child.

- **Method**: `PUT`
- **Path**: `/nakes/children/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

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
PUT /nakes/children/01950d87-35fc-79c2-9014-464a69b76615 HTTP/1.1
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
  "BirthDate": "2023-01-15",
  "HomeAddress": "Jl. Anggrek No. 5, RT 02/RW 03",
  "CreatedAt": "2024-01-01T00:00:00Z",
  "UpdatedAt": "2024-01-02T00:00:00Z"
}
```

---

### 5. Delete Child (Nakes)

Deletes a child record by ID.

- **Method**: `DELETE`
- **Path**: `/nakes/children/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
DELETE /nakes/children/01950d87-35fc-79c2-9014-464a69b76615 HTTP/1.1
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

### 6. Get Children by Parent (Orang Tua)

Retrieves all children registered for the currently authenticated parent.

- **Method**: `GET`
- **Path**: `/ortu/child`
- **Authentication**: Bearer JWT (`orang_tua` role required)

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
    "BirthDate": "2023-01-15",
    "HomeAddress": "Jl. Mawar No. 12, RT 01/RW 02",
    "CreatedAt": "2024-01-01T00:00:00Z",
    "UpdatedAt": "2024-01-01T00:00:00Z"
  }
]
```
