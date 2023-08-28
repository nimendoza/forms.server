import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1000000000001 implements MigrationInterface {
    name = 'Migration1000000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "fields" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "UQ_b30e85af256b5c6b6039e886a6c" UNIQUE ("slug"),
                CONSTRAINT "PK_ee7a215c6cd77a59e2cb3b59d41" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "forms" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "UQ_beb11480ce7ba6813fe893723a1" UNIQUE ("slug"),
                CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "groups" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "UQ_eccfe767267171ae21e7cbf183d" UNIQUE ("slug"),
                CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."privileges_type_enum" AS ENUM('NONE', 'EDIT', 'CREATE', 'DELETE')
        `);
        await queryRunner.query(`
            CREATE TABLE "privileges" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "type" "public"."privileges_type_enum" NOT NULL DEFAULT 'NONE',
                "scope_id" uuid,
                CONSTRAINT "UQ_2c42c1ea17bde14dc60cbebc009" UNIQUE ("slug"),
                CONSTRAINT "PK_13f3ff98ae4d5565ec5ed6036cd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "responses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "data" jsonb NOT NULL,
                "field_id" uuid,
                "user_id" uuid,
                CONSTRAINT "UQ_57470b93f0c42b43908e2595ebf" UNIQUE ("slug"),
                CONSTRAINT "PK_be3bdac59bd243dff421ad7bf70" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "scopes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "UQ_d13ed08ee0e6c49105b489cca4a" UNIQUE ("slug"),
                CONSTRAINT "PK_fb1f703d1ac574fe4551a354977" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                "name" character varying NOT NULL,
                "hashed_password" character varying NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "forms_fields" (
                "form_id" uuid NOT NULL,
                "field_id" uuid NOT NULL,
                CONSTRAINT "PK_77d745957918409ea7f08ad17a9" PRIMARY KEY ("form_id", "field_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_621a78912277090c76ea9b3366" ON "forms_fields" ("form_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e866ee5b413b38a29a885b7db6" ON "forms_fields" ("field_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "groups_privileges" (
                "privilege_id" uuid NOT NULL,
                "group_id" uuid NOT NULL,
                CONSTRAINT "PK_a2b651524c8e7e2641d6f954dd6" PRIMARY KEY ("privilege_id", "group_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cb96bb3979f97bdb91b3a3e4c0" ON "groups_privileges" ("privilege_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6fd3afe8bf81810387f267bf7c" ON "groups_privileges" ("group_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "users_groups" (
                "user_id" uuid NOT NULL,
                "group_id" uuid NOT NULL,
                CONSTRAINT "PK_4c4a5923bbe3439dfc72dcfef4c" PRIMARY KEY ("user_id", "group_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3f4a7469c59e1c47a02a4f9ac5" ON "users_groups" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d665a3539878a2669c5ff26966" ON "users_groups" ("group_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "users_privileges" (
                "user_id" uuid NOT NULL,
                "privilege_id" uuid NOT NULL,
                CONSTRAINT "PK_b6fd5258d994a85ec8e38cb2d96" PRIMARY KEY ("user_id", "privilege_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_aa1a75369466ab33b704848225" ON "users_privileges" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1fc4cce2ce787ff84a4fb79e8b" ON "users_privileges" ("privilege_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges"
            ADD CONSTRAINT "FK_3228e69ce9a721dc8b1f2b18955" FOREIGN KEY ("scope_id") REFERENCES "scopes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "responses"
            ADD CONSTRAINT "FK_927cae8ad2a3179cef5ba149924" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "responses"
            ADD CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "forms_fields"
            ADD CONSTRAINT "FK_621a78912277090c76ea9b33663" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "forms_fields"
            ADD CONSTRAINT "FK_e866ee5b413b38a29a885b7db67" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "groups_privileges"
            ADD CONSTRAINT "FK_cb96bb3979f97bdb91b3a3e4c06" FOREIGN KEY ("privilege_id") REFERENCES "privileges"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "groups_privileges"
            ADD CONSTRAINT "FK_6fd3afe8bf81810387f267bf7c8" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_groups"
            ADD CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_groups"
            ADD CONSTRAINT "FK_d665a3539878a2669c5ff26966c" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_privileges"
            ADD CONSTRAINT "FK_aa1a75369466ab33b7048482254" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_privileges"
            ADD CONSTRAINT "FK_1fc4cce2ce787ff84a4fb79e8b6" FOREIGN KEY ("privilege_id") REFERENCES "privileges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_privileges" DROP CONSTRAINT "FK_1fc4cce2ce787ff84a4fb79e8b6"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_privileges" DROP CONSTRAINT "FK_aa1a75369466ab33b7048482254"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_groups" DROP CONSTRAINT "FK_d665a3539878a2669c5ff26966c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_groups" DROP CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50"
        `);
        await queryRunner.query(`
            ALTER TABLE "groups_privileges" DROP CONSTRAINT "FK_6fd3afe8bf81810387f267bf7c8"
        `);
        await queryRunner.query(`
            ALTER TABLE "groups_privileges" DROP CONSTRAINT "FK_cb96bb3979f97bdb91b3a3e4c06"
        `);
        await queryRunner.query(`
            ALTER TABLE "forms_fields" DROP CONSTRAINT "FK_e866ee5b413b38a29a885b7db67"
        `);
        await queryRunner.query(`
            ALTER TABLE "forms_fields" DROP CONSTRAINT "FK_621a78912277090c76ea9b33663"
        `);
        await queryRunner.query(`
            ALTER TABLE "responses" DROP CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c"
        `);
        await queryRunner.query(`
            ALTER TABLE "responses" DROP CONSTRAINT "FK_927cae8ad2a3179cef5ba149924"
        `);
        await queryRunner.query(`
            ALTER TABLE "privileges" DROP CONSTRAINT "FK_3228e69ce9a721dc8b1f2b18955"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1fc4cce2ce787ff84a4fb79e8b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aa1a75369466ab33b704848225"
        `);
        await queryRunner.query(`
            DROP TABLE "users_privileges"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d665a3539878a2669c5ff26966"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_3f4a7469c59e1c47a02a4f9ac5"
        `);
        await queryRunner.query(`
            DROP TABLE "users_groups"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6fd3afe8bf81810387f267bf7c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cb96bb3979f97bdb91b3a3e4c0"
        `);
        await queryRunner.query(`
            DROP TABLE "groups_privileges"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e866ee5b413b38a29a885b7db6"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_621a78912277090c76ea9b3366"
        `);
        await queryRunner.query(`
            DROP TABLE "forms_fields"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "scopes"
        `);
        await queryRunner.query(`
            DROP TABLE "responses"
        `);
        await queryRunner.query(`
            DROP TABLE "privileges"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."privileges_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "groups"
        `);
        await queryRunner.query(`
            DROP TABLE "forms"
        `);
        await queryRunner.query(`
            DROP TABLE "fields"
        `);
    }

}
