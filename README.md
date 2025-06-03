
## Structure
- `common`: Shared entities, DTOs, validation, errors, middlewares.
- `auth`: Service A, uses shared models.
- `todos`: Service B, uses shared models.

## Common Library (Shared NPM Package)

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

## Adding New Models
1. Add entity to `common/src/entities/`.
2. Add DTO/validation if needed in `common/src/dto/`.
3. Export from `common/src/index.ts`.
4. Import in services.

## Seeding:

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

## Migration:


1. Update the entity file to include the new column:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    username?: string;

    // Other columns...
}
```
2. Create a migration with the following command:

```bash
typeorm migration:create src/db/migration/AddUsernameToUser
```

In this command, `AddUsernameToUser` is the name of the migration file. You can change it to whatever you like.

3. Implement the migration logic:

The generated file will include up and down methods. You’ll need to implement the necessary SQL in each:

   - The up method should include the logic to apply the changes (e.g., adding a column).

   - The down method should undo those changes, it's used when rolling back a migration.

Here's an example that adds a username column to the user table:

```typescript
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

4. Run the Migration:

To apply the migration:
```bash
npx typeorm-ts-node-commonjs migration:run -d src/db/data-source.ts
```
To revert the migration:

```bash
npx typeorm-ts-node-commonjs migration:revert -d src/db/data-source.ts
```
