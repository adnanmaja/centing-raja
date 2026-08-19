# Notifications API

This document details all endpoints for user notifications in Centing.

---

## 📖 Overview

The notification module allows the system and healthcare workers to send notifications to users and enables users to read and manage their notification history.

- **Role Permissions**:
  - Authenticated Users: List personal notifications, get notification details, and mark notifications as read.
  - Healthcare Workers (`tenaga_kesehatan`): Send notifications to users and delete notifications (`/nakes/notifications`).
- All endpoints require JWT Bearer authentication:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 📌 Endpoints

- [1. List User Notifications](#1-list-user-notifications)
- [2. Get Notification by ID](#2-get-notification-by-id)
- [3. Mark Notification as Read](#3-mark-notification-as-read)
- [4. Create Notification (Nakes)](#4-create-notification-nakes)
- [5. Delete Notification (Nakes)](#5-delete-notification-nakes)

---

### 1. List User Notifications

Retrieves all notifications for the authenticated user.

- **Method**: `GET`
- **Path**: `/notifications`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
GET /notifications HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
[
  {
    "ID": "01950d87-35fc-79c2-9014-464a69b76650",
    "UserID": "01950d87-35fc-79c2-9014-464a69b76610",
    "Title": "Jadwal Posyandu Balita",
    "Message": "Pengukuran balita akan diadakan besok pukul 08:00 WIB di Posyandu Melati.",
    "IsRead": false,
    "CreatedAt": "2024-01-15T08:00:00Z"
  }
]
```

---

### 2. Get Notification by ID

Retrieves details of a single notification by its UUID.

- **Method**: `GET`
- **Path**: `/notifications/:id`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
GET /notifications/01950d87-35fc-79c2-9014-464a69b76650 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76650",
  "UserID": "01950d87-35fc-79c2-9014-464a69b76610",
  "Title": "Jadwal Posyandu Balita",
  "Message": "Pengukuran balita akan diadakan besok pukul 08:00 WIB di Posyandu Melati.",
  "IsRead": false,
  "CreatedAt": "2024-01-15T08:00:00Z"
}
```

---

### 3. Mark Notification as Read

Updates a notification's status to read.

- **Method**: `PATCH`
- **Path**: `/notifications/:id/read`
- **Authentication**: Bearer JWT (All authenticated roles)

#### Example Request

```http
PATCH /notifications/01950d87-35fc-79c2-9014-464a69b76650/read HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "notification marked as read"
}
```

---

### 4. Create Notification (Nakes)

Sends a notification to a specific user.

- **Method**: `POST`
- **Path**: `/nakes/notifications`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)
- **Headers**:
  - `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | `string` (UUID) | **Yes** | Target recipient's UUID |
| `title` | `string` | **Yes** | Notification title |
| `message` | `string` | **Yes** | Notification message body |

#### Example Request

```http
POST /nakes/notifications HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "user_id": "01950d87-35fc-79c2-9014-464a69b76610",
  "title": "Jadwal Posyandu Balita",
  "message": "Pengukuran balita akan diadakan besok pukul 08:00 WIB di Posyandu Melati."
}
```

#### Response (`201 Created`)

```json
{
  "ID": "01950d87-35fc-79c2-9014-464a69b76650",
  "UserID": "01950d87-35fc-79c2-9014-464a69b76610",
  "Title": "Jadwal Posyandu Balita",
  "Message": "Pengukuran balita akan diadakan besok pukul 08:00 WIB di Posyandu Melati.",
  "IsRead": false,
  "CreatedAt": "2024-01-15T08:00:00Z"
}
```

---

### 5. Delete Notification (Nakes)

Deletes a notification by its UUID.

- **Method**: `DELETE`
- **Path**: `/nakes/notifications/:id`
- **Authentication**: Bearer JWT (`tenaga_kesehatan` role required)

#### Example Request

```http
DELETE /nakes/notifications/01950d87-35fc-79c2-9014-464a69b76650 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

#### Response (`200 OK`)

```json
{
  "message": "notification deleted successfully"
}
```
