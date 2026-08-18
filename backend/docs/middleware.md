# Middleware & Role-Based Access Control (RBAC)

This document describes the authentication middleware, role enforcement mechanisms, context propagation, and authorization error responses across the Centing Backend API.

---

## 🛡️ Authentication Middleware (`AuthMiddleware`)

Protected endpoints use `AuthMiddleware()` to enforce JWT authentication. The client must supply the token in the `Authorization` header:

```http
Authorization: Bearer <jwt_token_here>
```

### Injected Gin Context Keys

When `AuthMiddleware` verifies a valid JWT, it attaches user identity claims to the `*gin.Context` for subsequent handlers:

| Context Key | Type | Description |
| :--- | :--- | :--- |
| `user_id` | `string` | Authenticated user's UUID string |
| `phone` | `string` | Authenticated user's registered phone number |
| `role` | `db.Roles` | User's role enum (`tenaga_kesehatan`, `kader`, `orang_tua`) |

### Example Handler Context Retrieval

```go
userID, exists := c.Get("user_id")
role, exists := c.Get("role")
```

---

## 🔒 Role-Based Route Protection (`RequireRole`)

Specific route groups or individual endpoints are restricted to authorized roles using `RequireRole(...)`:

```go
// Healthcare worker (Tenaga Kesehatan) only
nakes := protected.Group("/nakes")
nakes.Use(RequireRole(db.UserRoleTenagaKesehatan))

// Posyandu cadre (Kader) only
kader := protected.Group("/kader")
kader.Use(RequireRole(db.UserRoleKader))

// Parents (Orang Tua) only
ortu := protected.Group("/ortu")
ortu.Use(RequireRole(db.UserRoleOrangTua))

// Multiple allowed roles (e.g. medical staff)
staff := protected.Group("/staff")
staff.Use(RequireRole(db.UserRoleTenagaKesehatan, db.UserRoleKader))
```

---

## ⚠️ Middleware Error Responses

### 1. Missing Authorization Header (`401 Unauthorized`)

When the `Authorization` header is omitted from a protected request:

```json
{
  "error": "No authorization header"
}
```

### 2. Malformed Header (`401 Unauthorized`)

When the header does not match the `Bearer <token>` format:

```json
{
  "error": "Invalid token format"
}
```

### 3. Expired or Invalid JWT (`401 Unauthorized`)

When the token signature fails verification or has expired:

```json
{
  "error": "Invalid or expired token"
}
```

### 4. Insufficient Role Permissions (`403 Forbidden`)

When an authenticated user attempts to access an endpoint restricted to another role (via `RequireRole`):

```json
{
  "error": "Forbidden: insufficient permissions"
}
```
