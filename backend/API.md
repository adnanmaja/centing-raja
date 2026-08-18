# Centing Backend API Documentation

The Centing Backend API documentation has been organized into modular documents located in the [`docs/`](docs/README.md) directory:

---

## 📚 API Documentation by Concern

- 📖 **[API Overview & Index](docs/README.md)** — Base URL, CORS, standard error responses, and complete endpoints summary table.
- 🔐 **[Authentication & Core API](docs/auth.md)** — Health check (`/`), user registration (`/register`), OTP request/verification (`/login/*`), and JWT token specifications.
- 👶 **[Children Management API](docs/children.md)** — Child profiles CRUD (`/children`, `/children/:id`) and parent-specific child listings (`/ortu/child`).
- 📏 **[Measurements & Growth Tracking API](docs/measurements.md)** — Anthropometric measurements CRUD (`/measurements`, `/measurements/:id`), child measurement history (`/:role/children/:id/measurements`), and auto-calculated age.
- 🛡️ **[Middleware & Role-Based Access Control](docs/middleware.md)** — JWT `AuthMiddleware`, Gin context injection, `RequireRole` route protection, and error payloads.
- 📝 **[Quizzes & Submissions API](docs/quiz.md)** — Quizzes CRUD (`/quizzes`, `/quizzes/:id`), questions (`/quizzes/:id/questions`), and submissions (`/quizzes/:id/submissions`, `/kader/submissions`).

---

For complete request/response schemas, status codes, and JSON payload examples, please visit the respective module documentation in [`docs/`](docs/README.md).
