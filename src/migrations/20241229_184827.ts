import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_content_layout" AS ENUM('oneColumn', 'twoColumns', 'threeColumns');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_appearance_theme" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_appearance_aspect_ratio" AS ENUM('16/9', '4/3', '1/1', 'auto');
  CREATE TYPE "public"."enum_card_grid_layout" AS ENUM('grid', 'list', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_settings_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_settings_gap" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_hero_layout" AS ENUM('centered', 'start');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_appearance_theme" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_appearance_aspect_ratio" AS ENUM('16/9', '4/3', '1/1', 'auto');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_settings_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_settings_gap" AS ENUM('small', 'medium', 'large');
  CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_content_layout" DEFAULT 'oneColumn',
  	"column_one" jsonb,
  	"column_two" jsonb,
  	"column_three" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"media_id" integer,
  	"link_type" "enum_pages_blocks_card_grid_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_card_grid_cards_link_appearance" DEFAULT 'default',
  	"appearance_theme" "enum_pages_blocks_card_grid_cards_appearance_theme" DEFAULT 'default',
  	"appearance_enable_hover" boolean DEFAULT true,
  	"appearance_aspect_ratio" "enum_pages_blocks_card_grid_cards_appearance_aspect_ratio" DEFAULT '16/9'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_card_grid_layout" DEFAULT 'grid',
  	"settings_columns" "enum_pages_blocks_card_grid_settings_columns" DEFAULT '3',
  	"settings_gap" "enum_pages_blocks_card_grid_settings_gap" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum_content_layout" DEFAULT 'oneColumn',
  	"column_one" jsonb,
  	"column_two" jsonb,
  	"column_three" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"media_id" integer,
  	"link_type" "enum__pages_v_blocks_card_grid_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_card_grid_cards_link_appearance" DEFAULT 'default',
  	"appearance_theme" "enum__pages_v_blocks_card_grid_cards_appearance_theme" DEFAULT 'default',
  	"appearance_enable_hover" boolean DEFAULT true,
  	"appearance_aspect_ratio" "enum__pages_v_blocks_card_grid_cards_appearance_aspect_ratio" DEFAULT '16/9',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_card_grid_layout" DEFAULT 'grid',
  	"settings_columns" "enum__pages_v_blocks_card_grid_settings_columns" DEFAULT '3',
  	"settings_gap" "enum__pages_v_blocks_card_grid_settings_gap" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "hero_layout" "enum_hero_layout";
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_layout" "enum_hero_layout";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_grid_cards_media_idx" ON "pages_blocks_card_grid_cards" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_cards_media_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_layout";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_layout";
  DROP TYPE "public"."enum_content_layout";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_appearance_theme";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_appearance_aspect_ratio";
  DROP TYPE "public"."enum_card_grid_layout";
  DROP TYPE "public"."enum_pages_blocks_card_grid_settings_columns";
  DROP TYPE "public"."enum_pages_blocks_card_grid_settings_gap";
  DROP TYPE "public"."enum_hero_layout";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_appearance_theme";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_appearance_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_settings_columns";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_settings_gap";`)
}
