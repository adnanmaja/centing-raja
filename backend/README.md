# Centing Backend

Backend service for **Centing** (Centing Raja) — a stunting prevention and monitoring platform. This REST API handles user registration, role-based access control, and passwordless authentication via OTP (One-Time Password) with JWT tokens.

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Project Structure](#-architecture--project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Start Database (Docker Compose)](#2-start-database-docker-compose)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Apply Database Schema](#4-apply-database-schema)
  - [5. Run the Application](#5-run-the-application)
- [Environment Variables](#-environment-variables)
- [Database & Code Generation (sqlc)](#-database--code-generation-sqlc)
- [Running Tests](#-running-tests)
- [API Documentation](#-api-documentation)

---

## ✨ Features

- **Passwordless Authentication**: Secure phone-number-based login with time-limited 6-digit OTP codes.
- **Role-Based Access Control**:
  - `tenaga_kesehatan` (Healthcare worker / Medical staff)
  - `kader` (Posyandu cadre / Volunteer)
  - `orang_tua` (Parent / Guardian)
- **JWT Authorization**: Stateless token-based auth with HMAC SHA256 signing.
- **Type-Safe Database Access**: Powered by `sqlc` with PostgreSQL and `pgx/v5` connection pooling.
- **CORS Configured**: Ready for frontend integration across origins.

---

## 🛠 Tech Stack

- **Language**: [Go](https://go.dev/) (1.26+)
- **HTTP Framework**: [Gin Web Framework](https://github.com/gin-gonic/gin)
- **Database Driver**: [pgx/v5](https://github.com/jackc/pgx)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Dockerized)
- **Query Generator**: [sqlc](https://sqlc.dev/)
- **Authentication / JWT**: [golang-jwt/jwt/v5](https://github.com/golang-jwt/jwt)
- **Config Management**: [godotenv](https://github.com/joho/godotenv)

---

## 📁 Architecture & Project Structure

The project follows a clean layered architecture separating HTTP handlers, business logic/services, and database queries:

```text
backend/
├── db/                   # Generated Go code from SQL via sqlc
│   ├── db.go             # DBTX interface and DB connection helpers
│   ├── models.go         # Generated model structs and enum types
│   └── query.sql.go      # Type-safe query implementations
├── docs/                 # Modular API & system documentation
│   ├── README.md         # API overview, status codes, and endpoint directory
│   ├── auth.md           # Authentication, OTP flows, and JWT specifications
│   ├── children.md       # Children profiles CRUD & parent endpoints
│   ├── measurements.md   # Growth measurements, child history & auto age logic
│   └── middleware.md     # Middleware context keys, role protection & errors
├── handler/              # HTTP delivery layer (Gin handlers & middleware)
│   ├── auth.go           # Authentication endpoints (register, request/verify OTP)
│   ├── auth_test.go      # Handler unit & validation tests
│   ├── children.go       # Children management endpoints
│   ├── measurement.go    # Measurement tracking endpoints
│   ├── middleware.go     # JWT authentication & role-based middleware
│   ├── middleware_test.go# Middleware test suite
│   └── server.go         # Gin router setup and CORS configuration
├── schema/               # Database definitions & queries
│   ├── query.sql         # Raw SQL queries for sqlc
│   └── schema.sql        # PostgreSQL DDL schema & role enum
├── service/              # Core business logic layer
│   ├── auth.go           # User registration, OTP handling, and JWT management
│   ├── auth_test.go      # Unit tests for JWT signing and verification
│   ├── children.go       # Children service logic
│   ├── measurement.go    # Measurement service & age calculation logic
│   └── service.go        # Service registry / dependency injection
├── .env                  # Environment configuration (local)
├── docker-compose.yml    # PostgreSQL container specification
├── go.mod / go.sum       # Go module dependencies
├── main.go               # Application entrypoint
├── sqlc.yaml             # sqlc configuration
├── API.md                # API documentation entry point
└── README.md             # Project documentation
```

---

## 📋 Prerequisites

Before running the application, make sure you have:

- [Go](https://go.dev/dl/) (version 1.26 or higher recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [sqlc](https://docs.sqlc.dev/en/latest/overview/install.html) *(optional, only needed if modifying SQL queries)*

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
cd backend
```

### 2. Start Database (Docker Compose)

Start the PostgreSQL database service:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432` with the credentials configured in `docker-compose.yml`:
- **Database**: `centing_dev`
- **User**: `prabowo`
- **Password**: `prabowo`
- **Port**: `5432`

### 3. Configure Environment Variables

Create or update the `.env` file in the root directory:

```env
PORT=8080
DB_CONN_STRING=postgresql://prabowo:prabowo@127.0.0.1:5432/centing_dev
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Apply Database Schema

Execute the DDL schema into your PostgreSQL database:

```bash
# Using docker exec with psql
docker exec -i postgress psql -U prabowo -d centing_dev < schema/schema.sql
```

*Or run the SQL statements in `schema/schema.sql` directly using your preferred database client (e.g. DBeaver, TablePlus, or psql).*

### 5. Run the Application

```bash
go run main.go
```

The server will start listening at `http://localhost:8080`.

Verify the health check endpoint:

```bash
curl http://localhost:8080/
# Output: {"status":"aman"}
```

---

## 🔐 Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port number the HTTP server listens on | `8080` |
| `DB_CONN_STRING` | PostgreSQL connection URL | `postgresql://prabowo:prabowo@127.0.0.1:5432/centing_dev` |
| `JWT_SECRET` | Secret key used for signing and validating JWTs | `your_secret_key_here` |

---

## 🗄 Database & Code Generation (sqlc)

This project uses [sqlc](https://sqlc.dev/) to generate type-safe Go code from pure SQL queries.

If you modify `schema/schema.sql` or `schema/query.sql`, re-generate the Go database layer:

```bash
sqlc generate
```

The generated code will be output to the `db/` directory.

---

## 🧪 Running Tests

Run all unit and handler tests across packages:

```bash
go test -v ./...
```

---

Detailed endpoint specifications, request/response headers, status codes, and JSON payload examples are organized by domain in the [`docs/`](docs/README.md) directory:

### 📑 Documentation by Domain

- 📖 **[API Overview & Directory](docs/README.md)** — Base URL, CORS, standard errors, and full routing index.
- 🔐 **[Authentication & Core API](docs/auth.md)** — Registration, OTP-based passwordless login, and JWT format.
- 👶 **[Children Management API](docs/children.md)** — Child profiles CRUD and parent-child associations (`/children`, `/ortu/child`).
- 📏 **[Measurements & Growth Tracking API](docs/measurements.md)** — Growth tracking, measurements CRUD, and child measurement history.
- 🛡️ **[Middleware & Security (RBAC)](docs/middleware.md)** — JWT verification, Gin context claims, and role-based route protection (`RequireRole`).

### Quick Reference

| Method | Endpoint | Auth Required | Allowed Roles | Documentation |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | No | Any | [Health Check](docs/auth.md#1-health-check) |
| `POST` | `/register` | No | Any | [Register User](docs/auth.md#2-register-user) |
| `POST` | `/login/request-otp` | No | Any | [Request OTP](docs/auth.md#3-request-otp-login) |
| `POST` | `/login/verify-otp` | No | Any | [Verify OTP](docs/auth.md#4-verify-otp-login) |
| `POST` | `/children` | Yes (JWT) | All roles | [Create Child](docs/children.md#1-create-child) |
| `GET` | `/children` | Yes (JWT) | All roles | [List Children](docs/children.md#2-list-children) |
| `GET` | `/children/:id` | Yes (JWT) | All roles | [Get Child by ID](docs/children.md#3-get-child-by-id) |
| `PUT` | `/children/:id` | Yes (JWT) | All roles | [Update Child](docs/children.md#4-update-child) |
| `DELETE` | `/children/:id` | Yes (JWT) | All roles | [Delete Child](docs/children.md#5-delete-child) |
| `GET` | `/ortu/child` | Yes (JWT) | `orang_tua` | [Get Parent's Children](docs/children.md#6-get-children-by-parent) |
| `POST` | `/measurements` | Yes (JWT) | All roles | [Create Measurement](docs/measurements.md#1-create-measurement) |
| `GET` | `/measurements` | Yes (JWT) | All roles | [Get Measurements (Measurer)](docs/measurements.md#2-get-measurements-by-measurer) |
| `GET` | `/measurements/:id` | Yes (JWT) | All roles | [Get Measurement by ID](docs/measurements.md#3-get-measurement-by-id) |
| `GET` | `/nakes/children/:id/measurements` | Yes (JWT) | `tenaga_kesehatan` | [Child Measurements (Nakes)](docs/measurements.md#4-list-measurements-by-child-id) |
| `GET` | `/ortu/children/:id/measurements` | Yes (JWT) | `orang_tua` | [Child Measurements (Ortu)](docs/measurements.md#4-list-measurements-by-child-id) |
| `PUT` | `/measurements/:id` | Yes (JWT) | All roles | [Update Measurement](docs/measurements.md#5-update-measurement) |
| `DELETE` | `/measurements/:id` | Yes (JWT) | All roles | [Delete Measurement](docs/measurements.md#6-delete-measurement) |

For complete schemas and payload examples, see the full **[API Documentation Index](docs/README.md)**.
