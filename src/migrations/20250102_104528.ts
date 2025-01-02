import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_feature_grid_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_grid_locales" (
  	"headline_title" varchar,
  	"headline_description" varchar,
  	"promo_card_title" varchar,
  	"promo_card_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_grid_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_grid_locales" (
  	"headline_title" varchar,
  	"headline_description" varchar,
  	"promo_card_title" varchar,
  	"promo_card_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_grid_cards_locales" ADD CONSTRAINT "pages_blocks_feature_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_grid_locales" ADD CONSTRAINT "pages_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_grid_cards_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_grid_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_feature_grid_cards_locales_locale_parent_id_unique" ON "pages_blocks_feature_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_feature_grid_locales_locale_parent_id_unique" ON "pages_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_blocks_feature_grid_cards" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_feature_grid_cards" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "headline_title";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "headline_description";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_title";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_description";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_feature_grid_cards" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_feature_grid_cards" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "headline_title";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "headline_description";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_title";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_description";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_appearance" AS ENUM('default', 'outline');
  DROP TABLE "pages_blocks_feature_grid_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_locales" CASCADE;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "link_appearance" "enum_pages_blocks_card_grid_cards_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_feature_grid_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_feature_grid_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "headline_title" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "headline_description" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "promo_card_title" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "promo_card_description" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "link_appearance" "enum__pages_v_blocks_card_grid_cards_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_feature_grid_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "headline_title" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "headline_description" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "promo_card_title" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "promo_card_description" varchar;`)
}
