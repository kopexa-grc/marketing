import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_card_grid_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_card_grid_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_card_grid_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_card_grid_cards_locales" ADD CONSTRAINT "pages_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_card_grid_locales" ADD CONSTRAINT "pages_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_card_grid_cards_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_card_grid_locales" ADD CONSTRAINT "_pages_v_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_card_grid_cards_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_card_grid_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_card_grid_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN IF EXISTS "subtitle";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN IF EXISTS "heading";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN IF EXISTS "subtitle";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_card_grid" DROP COLUMN IF EXISTS "heading";
  ALTER TABLE "_pages_v_blocks_card_grid" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_locales" CASCADE;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD COLUMN "description" varchar;`)
}
