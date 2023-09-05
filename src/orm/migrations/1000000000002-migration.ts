import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11000000000002 implements MigrationInterface {
    name = 'Migration11000000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."privileges_type_enum"
            RENAME TO "privileges_type_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."privileges_type_enum" AS ENUM('NONE', 'EDIT', 'READ', 'CREATE', 'DELETE')
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ALTER COLUMN "type" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ALTER COLUMN "type" TYPE "public"."privileges_type_enum" USING "type"::"text"::"public"."privileges_type_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ALTER COLUMN "type"
            SET DEFAULT 'NONE'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."privileges_type_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."privileges_type_enum_old" AS ENUM('NONE', 'EDIT', 'CREATE', 'DELETE')
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ALTER COLUMN "type" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ALTER COLUMN "type" TYPE "public"."privileges_type_enum_old" USING "type"::"text"::"public"."privileges_type_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ALTER COLUMN "type"
            SET DEFAULT 'NONE'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."privileges_type_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."privileges_type_enum_old"
            RENAME TO "privileges_type_enum"
        `);
    }

}
