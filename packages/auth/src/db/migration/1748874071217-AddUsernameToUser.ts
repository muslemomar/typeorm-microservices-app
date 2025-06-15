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
