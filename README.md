## ▶️ Running, Testing, and Linting Services

Each service (`auth`, `todos`) and the shared `common` package have their own scripts.  
Run these commands from the respective directory (e.g., `cd auth` or `cd todos`):

#### Install Dependencies

```sh
npm install
```

#### Run the Service (Development)

```sh
npm run dev
```

#### Start the Service (Production)

```sh
npm run build    # Build the service
npm start        # Start the service in production
```

#### Run Tests

```sh
npm test
```

#### Lint the Code

```sh
npm run lint         # Check for lint issues
npm run lint:fix     # Auto-fix lint issues
npm run prettier     # Format code with Prettier
```

> **Note:**  
> Make sure to copy and configure the `.env` file in each service before running or testing.


## 🧱 Structure
- `common`: Shared entities, DTOs, validation, errors, middlewares.
- `auth`: Service A, uses shared models.
- `todos`: Service B, uses shared models.

## 📦 Common Library (Shared NPM Package)

The `common` package contains all shared logic, including TypeORM entities, DTOs, validation, and error handling. This package is published to npm as `@arbio/common` and consumed by both `auth` and `todos` services.

### How to Update and Publish the Common Library

1. Make your changes in the `common` package.
2. Bump the version (patch, minor, or major as needed):
   ```sh
   npm version patch
   ```
3. Build the package:
   ```sh
   npm run build
   ```
4. Publish to npm:
   ```sh
   npm publish
   ```

### How to Update Common in Each Service

After publishing a new version of `@arbio/common`, update it in each service (`auth`, `todos`):

```sh
npm update --save @arbio/common
```

## 🧬 Adding New Models
1. Add entity to `common/src/entities/`.
2. Add DTO/validation if needed in `common/src/dto/`.
3. Export from `common/src/index.ts`.
4. Import in services.

## 🌱 Seeding:

1. **Create a Factory (if needed):**  
   In factories (`src/db/seeding/factories`), create a file like `user.factory.ts` to define how to generate fake data for your entity.

2. **Create a Seeder:**  
   In seeds (`src/db/seeding/seeds`), create a file like `initialSeed.ts`.  
   Example:

```typescript
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '@arbio/common';

export class MainSeeder implements Seeder {
   public async run(
           dataSource: DataSource,
           factoryManager: SeederFactoryManager,
   ) {
      const userFactory = factoryManager.get(User);

      await userFactory.saveMany(10);
   }
}
```

3. **Run the Seeder:**
```sh
npm run seed
```

## 🔧️ Migration:

### **Auto-Generated Migration (Schema Diff)**

If you update your entity code, use this to auto-generate a migration:

```bash
npm run migration:generate -- src/db/migration/AddNewFieldToUser
```

> 🔄 This compares your current database schema with the entity definitions and generates a migration to match them.

---

### **Custom Migration (Manual SQL)**

If you want to write your own SQL:

1.  Update the Entity:

```ts
@Column({ type: 'varchar', length: 255, nullable: true })
username?: string;
```

2.  Create an empty migration:

```bash
npm run migration:create -- src/db/migration/AddUsernameToUser
```

3.  Edit the generated file with your SQL:

The generated file will include up and down methods. You’ll need to implement the necessary SQL in each:

- The up method should include the logic to apply the changes (e.g., adding a column).

- The down method should undo those changes, it's used when rolling back a migration.


```ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameToUser1748874071217 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
              'ALTER TABLE `user` ADD COLUMN `username` VARCHAR(255)',
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `user` DROP COLUMN `username`');
   }
}
```

---

### ▶️ **Running and Reverting Migrations**

-   **Run all pending migrations:**


```bash
npm run migration:run
```

-   **Revert the last executed migration:**


```bash
npm run migration:revert
```

## 🚀 CI/CD 

This project uses **GitHub Actions** for continuous integration, defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

- Runs on every push and pull request to `main`
- Installs dependencies, lints, tests, and builds each package (`common`, `auth`, `todos`)
- Ensures code quality and build success before merging

## 🛠 Tooling️

This project uses a modern Node.js/TypeScript toolchain to ensure code quality, maintainability, and developer productivity:

- **TypeScript:** Type safety and modern JS features
- **TypeORM:** MySQL ORM, migrations, seeding
- **Express:** REST API framework
- **Jest:** Unit and integration testing
- **ESLint & Prettier:** Linting and code formatting
- **dotenv:** Load environment variables
- **typeorm-extension:** Seeding and factories
- **GitHub Actions:** CI/CD pipeline

You can find configuration files for these tools in each package (e.g., `tsconfig.json`, `.prettierrc`, `eslint.config.mjs`) and in the root `.github/workflows/ci.yml` for CI/CD.
