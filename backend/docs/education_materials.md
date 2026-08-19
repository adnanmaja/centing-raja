# Education Materials API

This document details all endpoints for managing and retrieving educational materials in Centing.

---

## 📖 Overview

The education materials module hosts educational resources (stunting guidance, nutrition tips, video lectures) accessible by authenticated users.

- **Role Permissions**:
  - General Authenticated (`protected`): List and view educational materials (`GET /education-materials`, `GET /education-materials/:id`).
  - Healthcare Workers (`tenaga_kesehatan`): Create, update, and delete materials (`/nakes/education-materials`).
- All endpoints require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 📌 Endpoints

- [1. List Education Materials](#1-list-education-materials)
- [2. Get Education Material by ID](#2-get-education-material-by-id)
- [3. Create Education Material (Nakes)](#3-create-education-material-nakes)
- [4. Update Education Material (Nakes)](#4-update-education-material-nakes)
- [5. Delete Education Material (Nakes)](#5-delete-education-material-nakes)

---

### 1. List Education Materials

Retrieves a paginated list of education materials.

- **Method**: `GET`
- **Path**: `/education-materials`
- **Authentication**: Bearer JWT (All authenticated roles)
- **Query Parameters**:
  - `limit` (optional, default `10`): Number of materials to return.
  - `offset` (optional, default `0`): Pagination offset.

#### Example Request

```http
GET /education-materials?limit=10&offset=0 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76601",
    "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
    "Title": "Panduan Gizi Seimbang Balita",
    "Description": "Modul edukasi gizi dan MPASI bernutrisi tinggi",
    "VideoUrl": "https://www.youtube.com/watch?v=example",
    "CreatedAt": "2024-01-15T10:00:00Z",
    "UpdatedAt": "2024-01-15T10:00:00Z"
  }
]
```

---

### 2. Get Education Material by ID

Retrieves details of a single education material.

- **Method**: `GET`
- **Path**: `/education-materials/:id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
GET /education-materials/01950d87-35fc-79c2-9014-464a69b76601 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76601",
  "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
  "Title": "Panduan Gizi Seimbang Balita",
  "Description": "Modul edukasi gizi dan MPASI bernutrisi tinggi",
  "VideoUrl": "https://www.youtube.com/watch?v=example",
  "CreatedAt": "2024-01-15T10:00:00Z",
  "UpdatedAt": "2024-01-15T10:00:00Z"
}
```

---

### 3. Create Education Material (Nakes)

Creates a new educational material article/resource.

- **Method**: `POST`
- **Path**: `/nakes/education-materials`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Material title |
| `description` | `string` | No | Full content / summary description |
| `video_url` | `string` | No | Optional video link (YouTube / Cloud) |

#### Example Request

```http
POST /nakes/education-materials HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Panduan Gizi Seimbang Balita",
  "description": "Modul edukasi gizi dan MPASI bernutrisi tinggi",
  "video_url": "https://www.youtube.com/watch?v=example"
}
```

#### Response (`201 Created`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76601",
  "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
  "Title": "Panduan Gizi Seimbang Balita",
  "Description": "Modul edukasi gizi dan MPASI bernutrisi tinggi",
  "VideoUrl": "https://www.youtube.com/watch?v=example",
  "CreatedAt": "2024-01-15T10:00:00Z",
  "UpdatedAt": "2024-01-15T10:00:00Z"
}
```

---

### 4. Update Education Material (Nakes)

Updates an existing education material.

- **Method**: `PUT`
- **Path**: `/nakes/education-materials/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Updated material title |
| `description` | `string` | No | Updated description |
| `video_url` | `string` | No | Updated video link |

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76601",
  "CreatorID": "01950d87-35fc-79c2-9014-464a69b76600",
  "Title": "Panduan Gizi Seimbang Balita - Revisi",
  "Description": "Deskripsi terupdate",
  "VideoUrl": "https://www.youtube.com/watch?v=updated",
  "CreatedAt": "2024-01-15T10:00:00Z",
  "UpdatedAt": "2024-01-15T11:00:00Z"
}
```

---

### 5. Delete Education Material (Nakes)

Deletes an education material by ID.

- **Method**: `DELETE`
- **Path**: `/nakes/education-materials/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
DELETE /nakes/education-materials/01950d87-35fc-79c2-9014-464a69b76601 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "education material deleted successfully"
}
```
