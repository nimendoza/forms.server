import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1000000000003 implements MigrationInterface {
    name = 'Migration1000000000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_state_enum" AS ENUM('ENABLED', 'DISABLED')
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "state" "public"."users_state_enum" NOT NULL DEFAULT 'DISABLED'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "state"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_state_enum"
        `);
    }

}
