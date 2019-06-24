import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseSchema1561297581259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('CREATE TABLE "currency" ("code" text NOT NULL, "currency" text NOT NULL, "bid" numeric NOT NULL, "ask" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_723472e41cae44beb0763f4039c" PRIMARY KEY ("code"))');
    queryRunner.query('CREATE TABLE "zombie_item" ("id" integer NOT NULL, "name" text NOT NULL, "price" numeric NOT NULL, "isVisible" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_eca2fe7aa83bcc7f5479acb8ea1" PRIMARY KEY ("id"))');
    queryRunner.query('CREATE TABLE "zombie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_37c1a89a1bfef615abd4ac2b56a" PRIMARY KEY ("id"))');
    queryRunner.query('CREATE TABLE "zombie_items_zombie_item" ("zombieId" uuid NOT NULL, "zombieItemId" integer NOT NULL, CONSTRAINT "PK_3144e65c1b3e926546501e2cbc9" PRIMARY KEY ("zombieId", "zombieItemId"))');
    queryRunner.query('CREATE INDEX "IDX_18ab67e56abfedfa8f04d29c46" ON "zombie_items_zombie_item" ("zombieId") ');
    queryRunner.query('CREATE INDEX "IDX_b7a3b651539cd595b24dc37640" ON "zombie_items_zombie_item" ("zombieItemId") ');
    queryRunner.query('ALTER TABLE "zombie_items_zombie_item" ADD CONSTRAINT "FK_18ab67e56abfedfa8f04d29c461" FOREIGN KEY ("zombieId") REFERENCES "zombie"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    queryRunner.query('ALTER TABLE "zombie_items_zombie_item" ADD CONSTRAINT "FK_b7a3b651539cd595b24dc376400" FOREIGN KEY ("zombieItemId") REFERENCES "zombie_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }
  

  public async down(queryRunner: QueryRunner): Promise<any> {
    
  }
}
