import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_solutionshowcase_media_type" AS ENUM('image', 'icon');
  CREATE TYPE "public"."enum_pages_blocks_solution_showcase_heading_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_solution_showcase_heading_alignment" AS ENUM('center', 'left');
  CREATE TABLE IF NOT EXISTS "pages_blocks_solution_showcase_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme_color_mode" "enum_theme_color_mode" DEFAULT 'light',
  	"title" varchar,
  	"description" varchar,
  	"media_media_type" "enum_solutionshowcase_media_type" DEFAULT 'image',
  	"media_image_id" integer,
  	"media_icon" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_solution_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme_color_mode" "enum_theme_color_mode" DEFAULT 'light',
  	"heading_title" varchar,
  	"heading_description" varchar,
  	"heading_alignment" "enum_pages_blocks_solution_showcase_heading_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_solution_showcase_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"theme_color_mode" "enum_theme_color_mode" DEFAULT 'light',
  	"title" varchar,
  	"description" varchar,
  	"media_media_type" "enum_solutionshowcase_media_type" DEFAULT 'image',
  	"media_image_id" integer,
  	"media_icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_solution_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"theme_color_mode" "enum_theme_color_mode" DEFAULT 'light',
  	"heading_title" varchar,
  	"heading_description" varchar,
  	"heading_alignment" "enum__pages_v_blocks_solution_showcase_heading_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "theme_color_mode" SET DATA TYPE enum_theme_color_mode;
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "promo_card_theme_color_mode" SET DATA TYPE enum_theme_color_mode;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "theme_color_mode" SET DATA TYPE enum_theme_color_mode;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "promo_card_theme_color_mode" SET DATA TYPE enum_theme_color_mode;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_solution_showcase_solutions" ADD CONSTRAINT "pages_blocks_solution_showcase_solutions_media_image_id_media_id_fk" FOREIGN KEY ("media_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_solution_showcase_solutions" ADD CONSTRAINT "pages_blocks_solution_showcase_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_solution_showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_solution_showcase" ADD CONSTRAINT "pages_blocks_solution_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_solution_showcase_solutions" ADD CONSTRAINT "_pages_v_blocks_solution_showcase_solutions_media_image_id_media_id_fk" FOREIGN KEY ("media_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_solution_showcase_solutions" ADD CONSTRAINT "_pages_v_blocks_solution_showcase_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_solution_showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_solution_showcase" ADD CONSTRAINT "_pages_v_blocks_solution_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_solution_showcase_solutions_order_idx" ON "pages_blocks_solution_showcase_solutions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_solution_showcase_solutions_parent_id_idx" ON "pages_blocks_solution_showcase_solutions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_solution_showcase_solutions_media_media_image_idx" ON "pages_blocks_solution_showcase_solutions" USING btree ("media_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_solution_showcase_order_idx" ON "pages_blocks_solution_showcase" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_solution_showcase_parent_id_idx" ON "pages_blocks_solution_showcase" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_solution_showcase_path_idx" ON "pages_blocks_solution_showcase" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solution_showcase_solutions_order_idx" ON "_pages_v_blocks_solution_showcase_solutions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solution_showcase_solutions_parent_id_idx" ON "_pages_v_blocks_solution_showcase_solutions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solution_showcase_solutions_media_media_image_idx" ON "_pages_v_blocks_solution_showcase_solutions" USING btree ("media_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solution_showcase_order_idx" ON "_pages_v_blocks_solution_showcase" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solution_showcase_parent_id_idx" ON "_pages_v_blocks_solution_showcase" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_solution_showcase_path_idx" ON "_pages_v_blocks_solution_showcase" USING btree ("_path");
  DROP TYPE "public"."enum_pages_blocks_feature_grid_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_promo_card_theme_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_theme_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_promo_card_theme_color_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_grid_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_promo_card_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_promo_card_theme_color_mode" AS ENUM('light', 'dark');
  ALTER TABLE "pages_blocks_solution_showcase_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_solution_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solution_showcase_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solution_showcase" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_solution_showcase_solutions" CASCADE;
  DROP TABLE "pages_blocks_solution_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_solution_showcase_solutions" CASCADE;
  DROP TABLE "_pages_v_blocks_solution_showcase" CASCADE;
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "theme_color_mode" SET DATA TYPE enum_pages_blocks_feature_grid_theme_color_mode;
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "promo_card_theme_color_mode" SET DATA TYPE enum_pages_blocks_feature_grid_promo_card_theme_color_mode;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "theme_color_mode" SET DATA TYPE enum__pages_v_blocks_feature_grid_theme_color_mode;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "promo_card_theme_color_mode" SET DATA TYPE enum__pages_v_blocks_feature_grid_promo_card_theme_color_mode;
  DROP TYPE "public"."enum_theme_color_mode";
  DROP TYPE "public"."enum_solutionshowcase_media_type";
  DROP TYPE "public"."enum_pages_blocks_solution_showcase_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_solution_showcase_heading_alignment";`)
}
