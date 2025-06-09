# `@arbio/common`

Shared package for cross-service models, types, validation, middlewares, and errors.  
Used by all services (e.g., `auth`, `todos`) to ensure consistency and avoid duplication.

## Contents

### 🗂 Entities

Located in `src/entities/`:

-   `User` entity

-   `Todo` entity


These are **TypeORM entities** used across services to interact with the database.

---

### 📝 DTOs & Validation

Located in `src/dto/`:

-   `UserDTO` — Data transfer object for user-related API input/output.

-   `TodoDTO` — Data transfer object for todo-related API input/output.


DTOs are separated from DB entities to allow for proper validation and API transport types.

---

### 🚦 Middlewares

Located in `src/middlewares/`. Here are some examples:

-   `requireAuth` — Middleware that ensures the user is authenticated (requires a valid JWT or session).

-   `validateRequest` — Middleware that validates incoming requests using `express-validator` and throws a standardized error if validation fails.

---

### 🛠 Errors

Located in `src/errors/`:

-   `BadRequestError` — To indicate invalid client input (HTTP 400).

-   `NotFoundError` — To indicate a resource was not found (HTTP 404).

-   `UnauthorizedError` — To indicate authentication failure (HTTP 401).

-   `CustomError` — Base error class to standardize error handling across services.


---

## 🚀 Usage

### Install

```sh
npm install @arbio/common
```

### Import in Services

#### Entities

```typescript
import { User } from '@arbio/common';
import { Todo } from '@arbio/common';
```

#### DTOs

```typescript
import { UserDTO } from '@arbio/common';
import { TodoDTO } from '@arbio/common';
```

#### Middlewares

```typescript
import { requireAuth, validateRequest } from '@arbio/common';
```

#### Errors

```typescript
import { BadRequestError, NotFoundError, UnauthorizedError } from '@arbio/common';
```

---

## 🛠 Development

### Build

```sh
npm run build
```

---

## 📦 Publishing

1.  Make your changes.

2.  Bump the version:


```sh
npm version patch
```

3.  Build the package:


```sh
npm run build
```

4.  Publish to npm:


```sh
npm publish
```

---

## ✨ Notes

-   When adding new things, make sure you export them via `src/index.ts`.

-   Follow semantic versioning when publishing new versions to avoid breaking dependent services.
