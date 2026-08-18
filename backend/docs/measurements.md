# Measurements & Growth Tracking API

This document details all endpoints for recording and tracking child growth measurements in Centing.

---

## 📖 Overview

The measurement module records physical anthropometric metrics for children to monitor growth and screen for stunting.

- **Automatic Age Calculation**: When creating a measurement, the backend automatically infers the child's age in days as `(measurement timestamp) - (child birth date)`.
- **Role Permissions**:
  - Healthcare workers (`tenaga_kesehatan`) and Posyandu cadres (`kader`) record measurements during posyandu checkups.
  - Parents (`orang_tua`) can review measurements for their children.
- All endpoints require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 📌 Endpoints

- [1. Create Measurement](#1-create-measurement)
- [2. Get Measurements (by Measurer)](#2-get-measurements-by-measurer)
- [3. Get Measurement by ID](#3-get-measurement-by-id)
- [4. List Measurements by Child ID](#4-list-measurements-by-child-id)
- [5. Update Measurement](#5-update-measurement)
- [6. Delete Measurement](#6-delete-measurement)

---

### 1. Create Measurement

Records a new child growth measurement. Age (in days) is calculated automatically from the child's birth date.

- **Method**: `POST`
- **Path**: `/measurements`
- **Authentication**: Bearer JWT (All roles)
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
POST /measurements HTTP/1.1
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
  "ID": "01950d87-35fc-79c2-9014-464a69b76620",
  "MeasurerID": "01950d87-35fc-79c2-9014-464a69b76610",
  "MeasurerRole": "kader",
  "ChildrenID": "01950d87-35fc-79c2-9014-464a69b76615",
  "Age": 365,
  "MeasuredAt": "2024-01-15T10:30:00Z",
  "Weight": 12.5,
  "Height": 85.0,
  "StuntingStatus": "normal",
  "ZScore": 0,
  "HeadCircumference": 46.0,
  "UpperArmCircumference": 14.5
}
```

---

### 2. Get Measurements (by Measurer)

Retrieves all measurements recorded by the currently authenticated user.

- **Method**: `GET`
- **Path**: `/measurements`
- **Authentication**: Bearer JWT (All roles)

#### Example Request

```http
GET /measurements HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76620",
    "MeasurerID": "01950d87-35fc-79c2-9014-464a69b76610",
    "MeasurerRole": "kader",
    "ChildrenID": "01950d87-35fc-79c2-9014-464a69b76615",
    "Age": 365,
    "MeasuredAt": "2024-01-15T10:30:00Z",
    "Weight": 12.5,
    "Height": 85.0,
    "StuntingStatus": "normal",
    "ZScore": 0,
    "HeadCircumference": 46.0,
    "UpperArmCircumference": 14.5
  }
]
```

---

### 3. Get Measurement by ID

Retrieves a single measurement record by its UUID.

- **Method**: `GET`
- **Path**: `/measurements/:id`
- **Authentication**: Bearer JWT (All roles)

#### Example Request

```http
GET /measurements/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76620",
  "MeasurerID": "01950d87-35fc-79c2-9014-464a69b76610",
  "MeasurerRole": "kader",
  "ChildrenID": "01950d87-35fc-79c2-9014-464a69b76615",
  "Age": 365,
  "MeasuredAt": "2024-01-15T10:30:00Z",
  "Weight": 12.5,
  "Height": 85.0,
  "StuntingStatus": "normal",
  "ZScore": 0,
  "HeadCircumference": 46.0,
  "UpperArmCircumference": 14.5
}
```

---

### 4. List Measurements by Child ID

Retrieves historical measurements for a specific child. Accessed via role-specific route prefixes.

- **Methods & Paths**:
  - `GET /nakes/children/:id/measurements` (Healthcare worker role: `tenaga_kesehatan`)
  - `GET /ortu/children/:id/measurements` (Parent role: `orang_tua`)
- **Authentication**: Bearer JWT with matching role

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
    "ID": "01950d87-35fc-79c2-9014-464a69b76620",
    "MeasurerID": "01950d87-35fc-79c2-9014-464a69b76610",
    "MeasurerRole": "kader",
    "ChildrenID": "01950d87-35fc-79c2-9014-464a69b76615",
    "Age": 365,
    "MeasuredAt": "2024-01-15T10:30:00Z",
    "Weight": 12.5,
    "Height": 85.0,
    "StuntingStatus": "normal",
    "ZScore": 0,
    "HeadCircumference": 46.0,
    "UpperArmCircumference": 14.5
  }
]
```

---

### 5. Update Measurement

Updates anthropometric data of an existing measurement record.

- **Method**: `PUT`
- **Path**: `/measurements/:id`
- **Authentication**: Bearer JWT (All roles)
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
PUT /measurements/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
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
  "ID": "01950d87-35fc-79c2-9014-464a69b76620",
  "MeasurerID": "01950d87-35fc-79c2-9014-464a69b76610",
  "MeasurerRole": "kader",
  "ChildrenID": "01950d87-35fc-79c2-9014-464a69b76615",
  "Age": 365,
  "MeasuredAt": "2024-01-15T10:30:00Z",
  "Weight": 13.0,
  "Height": 86.5,
  "StuntingStatus": "normal",
  "ZScore": 0,
  "HeadCircumference": 46.5,
  "UpperArmCircumference": 15.0
}
```

---

### 6. Delete Measurement

Deletes a measurement record by its UUID.

- **Method**: `DELETE`
- **Path**: `/measurements/:id`
- **Authentication**: Bearer JWT (All roles)

#### Example Request

```http
DELETE /measurements/01950d87-35fc-79c2-9014-464a69b76620 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "measurement deleted successfully"
}
```
