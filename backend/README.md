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
├── handler/              # HTTP delivery layer (Gin handlers & middleware)
│   ├── auth.go           # Authentication endpoints (register, request/verify OTP)
│   ├── auth_test.go      # Handler unit & validation tests
│   ├── middleware.go     # JWT authentication middleware
│   └── server.go         # Gin router setup and CORS configuration
├── schema/               # Database definitions & queries
│   ├── query.sql         # Raw SQL queries for sqlc
│   └── schema.sql        # PostgreSQL DDL schema & role enum
├── service/              # Core business logic layer
│   ├── auth.go           # User registration, OTP handling, and JWT management
│   ├── auth_test.go      # Unit tests for JWT signing and verification
│   └── service.go        # Service registry / dependency injection
├── .env                  # Environment configuration (local)
├── docker-compose.yml    # PostgreSQL container specification
├── go.mod / go.sum       # Go module dependencies
├── main.go               # Application entrypoint
├── sqlc.yaml             # sqlc configuration
├── API.md                # Comprehensive API & payload documentation
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

## 📚 API Documentation

Detailed endpoint specifications, request/response headers, status codes, and JSON payload examples are available in **[API.md](API.md)**.

### Quick Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check (`{"status": "aman"}`) |
| `POST` | `/register` | Register a new user (`tenaga_kesehatan`, `kader`, or `orang_tua`) |
| `POST` | `/login/request-otp` | Request a 6-digit OTP code for a phone number |
| `POST` | `/login/verify-otp` | Verify OTP code and receive a JWT Bearer token |

For full request and response schemas, see **[API.md](API.md)**.
