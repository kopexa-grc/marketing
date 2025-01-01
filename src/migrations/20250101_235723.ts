import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_promo_card_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_locales" (
  	"column_one" jsonb,
  	"column_two" jsonb,
  	"column_three" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_promo_card_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_locales" (
  	"column_one" jsonb,
  	"column_two" jsonb,
  	"column_three" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_promo_card_locales" ADD CONSTRAINT "pages_blocks_promo_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promo_card"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_locales" ADD CONSTRAINT "pages_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_promo_card_locales" ADD CONSTRAINT "_pages_v_blocks_promo_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promo_card"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_locales" ADD CONSTRAINT "_pages_v_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_promo_card_locales_locale_parent_id_unique" ON "pages_blocks_promo_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_content_locales_locale_parent_id_unique" ON "pages_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_promo_card_locales_locale_parent_id_unique" ON "_pages_v_blocks_promo_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_content_locales_locale_parent_id_unique" ON "_pages_v_blocks_content_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_promo_card" DROP COLUMN IF EXISTS "heading";
  ALTER TABLE "pages_blocks_promo_card" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "column_one";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "column_two";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "column_three";
  ALTER TABLE "_pages_v_blocks_promo_card" DROP COLUMN IF EXISTS "heading";
  ALTER TABLE "_pages_v_blocks_promo_card" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "column_one";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "column_two";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "column_three";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_promo_card_locales" CASCADE;
  DROP TABLE "pages_blocks_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_promo_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_locales" CASCADE;
  ALTER TABLE "pages_blocks_promo_card" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_promo_card" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "column_one" jsonb;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "column_two" jsonb;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "column_three" jsonb;
  ALTER TABLE "_pages_v_blocks_promo_card" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_promo_card" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "column_one" jsonb;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "column_two" jsonb;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "column_three" jsonb;`)
}
