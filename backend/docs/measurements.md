# Measurements & Growth Tracking API

This document details all endpoints for recording and tracking child growth measurements in Centing.

---

## 📖 Overview

The measurement module records physical anthropometric metrics for children to monitor growth, track historical trends, and screen for stunting.

- **Role Permissions**:
  - Healthcare workers (`tenaga_kesehatan`): Can record, view, list, update, and delete measurements (`/nakes/measurements`, `/nakes/children/:id/measurements`).
  - Parents (`orang_tua`): Can view measurement history for their registered children (`/ortu/children/:id/measurements`).
- All endpoints require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 📌 Endpoints

- [1. Create Measurement (Nakes)](#1-create-measurement-nakes)
- [2. Get Measurements by Measurer (Nakes)](#2-get-measurements-by-measurer-nakes)
- [3. Get Measurement by ID (Nakes)](#3-get-measurement-by-id-nakes)
- [4. List Measurements by Child ID (Nakes / Ortu)](#4-list-measurements-by-child-id-nakes--ortu)
- [5. Update Measurement (Nakes)](#5-update-measurement-nakes)
- [6. Delete Measurement (Nakes)](#6-delete-measurement-nakes)

---

### 1. Create Measurement (Nakes)

Records a new child growth measurement. Calculates age automatically.

- **Method**: `POST`
- **Path**: `/nakes/measurements`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `children_id` | `string` (UUID) | **Yes** | UUID of the child measured |
| `weight` | `number` | **Yes** | Weight in kilograms (e.g. `12.5`) |
| `height` | `number` | **Yes** | Height / length in centimeters (e.g. `85.0`) |
| `head_circumference` | `number` | No | Head circumference in cm (e.g. `46.0`) |
| `upper_arm_circumference` | `number` | No | Upper arm circumference (LiLA) in cm (e.g. `14.5`) |

#### Example Request

```http
POST /nakes/measurements HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "children_id": "01950d87-35fc-79c2-9014-464a69b76615",
  "weight": 12.5,
  "height": 85.0,
  "head_circumference": 46.0,
  "upper_arm_circumference": 14.5
}
```

#### Response (`201 Created`)

```json
{
  "id": "01950d87-35fc-79c2-9014-464a69b76620",
  "measurer_id": "01950d87-35fc-79c2-9014-464a69b76610",
  "measurer_role": "tenaga_kesehatan",
  "children_id": "01950d87-35fc-79c2-9014-464a69b76615",
  "age": 365,
  "measured_at": "2024-01-15T10:30:00Z",
  "weight": 12.5,
  "height": 85.0,
  "stunting_status": "normal",
  "z_score": 0,
  "head_circumference": 46.0,
  "upper_arm_circumference": 14.5
}
```

---

### 2. Get Measurements by Measurer (Nakes)

Retrieves all measurements recorded by the currently authenticated healthcare worker.

- **Method**: `GET`
- **Path**: `/nakes/measurements`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
GET /nakes/measurements HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "id": "01950d87-35fc-79c2-9014-464a69b76620",
    "measurer_id": "01950d87-35fc-79c2-9014-464a69b76610",
    "measurer_role": "tenaga_kesehatan",
    "children_id": "01950d87-35fc-79c2-9014-464a69b76615",
    "age": 365,
    "measured_at": "2024-01-15T10:30:00Z",
    "weight": 12.5,
    "height": 85.0,
    "stunting_status": "normal",
    "z_score": 0,
    "head_circumference": 46.0,
    "upper_arm_circumference": 14.5
  }
]
```

---

### 3. Get Measurement by ID (Nakes)

Retrieves a single measurement record by its UUID.

- **Method**: `GET`
- **Path**: `/nakes/measurements/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
GET /nakes/measurements/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "id": "01950d87-35fc-79c2-9014-464a69b76620",
  "measurer_id": "01950d87-35fc-79c2-9014-464a69b76610",
  "measurer_role": "tenaga_kesehatan",
  "children_id": "01950d87-35fc-79c2-9014-464a69b76615",
  "age": 365,
  "measured_at": "2024-01-15T10:30:00Z",
  "weight": 12.5,
  "height": 85.0,
  "stunting_status": "normal",
  "z_score": 0,
  "head_circumference": 46.0,
  "upper_arm_circumference": 14.5
}
```

---

### 4. List Measurements by Child ID (Nakes / Ortu)

Retrieves historical measurements for a specific child. Accessible by healthcare workers or the child's parents.

- **Methods & Paths**:
  - `GET /nakes/children/:id/measurements` (Healthcare worker: `tenaga_kesehatan`)
  - `GET /ortu/children/:id/measurements` (Parent: `orang_tua`)
- **Authentication**: Bearer JWT

#### Example Request

```http
GET /nakes/children/01950d87-35fc-79c2-9014-464a69b76615/measurements HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "id": "01950d87-35fc-79c2-9014-464a69b76620",
    "measurer_id": "01950d87-35fc-79c2-9014-464a69b76610",
    "measurer_role": "tenaga_kesehatan",
    "children_id": "01950d87-35fc-79c2-9014-464a69b76615",
    "age": 365,
    "measured_at": "2024-01-15T10:30:00Z",
    "weight": 12.5,
    "height": 85.0,
    "stunting_status": "normal",
    "z_score": 0,
    "head_circumference": 46.0,
    "upper_arm_circumference": 14.5
  }
]
```

---

### 5. Update Measurement (Nakes)

Updates anthropometric data of an existing measurement record.

- **Method**: `PUT`
- **Path**: `/nakes/measurements/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `weight` | `number` | **Yes** | Updated weight in kg |
| `height` | `number` | **Yes** | Updated height in cm |
| `head_circumference` | `number` | No | Updated head circumference in cm |
| `upper_arm_circumference` | `number` | No | Updated upper arm circumference in cm |

#### Example Request

```http
PUT /nakes/measurements/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "weight": 13.0,
  "height": 86.5,
  "head_circumference": 46.5,
  "upper_arm_circumference": 15.0
}
```

#### Response (`200 OK`)

```json
{
  "id": "01950d87-35fc-79c2-9014-464a69b76620",
  "measurer_id": "01950d87-35fc-79c2-9014-464a69b76610",
  "measurer_role": "tenaga_kesehatan",
  "children_id": "01950d87-35fc-79c2-9014-464a69b76615",
  "age": 365,
  "measured_at": "2024-01-15T10:30:00Z",
  "weight": 13.0,
  "height": 86.5,
  "stunting_status": "normal",
  "z_score": 0,
  "head_circumference": 46.5,
  "upper_arm_circumference": 15.0
}
```

---

### 6. Delete Measurement (Nakes)

Deletes a measurement record by its UUID.

- **Method**: `DELETE`
- **Path**: `/nakes/measurements/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
DELETE /nakes/measurements/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "measurement deleted successfully"
}
```
