# Children Management API

This document details all endpoints for managing child profiles and records in Centing.

---

## 📖 Overview

Child management allows authenticated healthcare workers (`tenaga_kesehatan`), cadres (`kader`), and parents (`orang_tua`) to register, retrieve, update, and remove child records.

- All endpoints in this module require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```
- When creating a child record, the system links the child to the authenticated user's ID as `parent_id`.

---

## 📌 Endpoints

- [1. Create Child](#1-create-child)
- [2. List Children](#2-list-children)
- [3. Get Child by ID](#3-get-child-by-id)
- [4. Update Child](#4-update-child)
- [5. Delete Child](#5-delete-child)
- [6. Get Children by Parent](#6-get-children-by-parent)

---

### 1. Create Child

Registers a new child associated with the authenticated parent.

- **Method**: `POST`
- **Path**: `/children`
- **Authentication**: Bearer JWT (All roles)
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

### 2. List Children

Retrieves a paginated list of all children registered in the system.

- **Method**: `GET`
- **Path**: `/children`
- **Authentication**: Bearer JWT (All roles)
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

### 3. Get Child by ID

Fetches full details of a specific child by their UUID.

- **Method**: `GET`
- **Path**: `/children/:id`
- **Authentication**: Bearer JWT (All roles)

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

### 4. Update Child

Updates the demographic and profile information of an existing child.

- **Method**: `PUT`
- **Path**: `/children/:id`
- **Authentication**: Bearer JWT (All roles)
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

### 5. Delete Child

Deletes a child record by ID.

- **Method**: `DELETE`
- **Path**: `/children/:id`
- **Authentication**: Bearer JWT (All roles)

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

### 6. Get Children by Parent

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
