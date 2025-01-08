import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_content_grid_variant" AS ENUM('sideBySide');
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_grid_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_grid_cells_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_content_grid_variant" DEFAULT 'sideBySide',
  	"heading_tag" "enum_heading_field_tag" DEFAULT 'h2',
  	"heading_level" "enum_heading_field_level" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_grid_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_grid_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_grid_cells_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum_content_grid_variant" DEFAULT 'sideBySide',
  	"heading_tag" "enum_heading_field_tag" DEFAULT 'h2',
  	"heading_level" "enum_heading_field_level" DEFAULT '2',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_grid_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_grid_cells" ADD CONSTRAINT "pages_blocks_content_grid_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_grid_cells_locales" ADD CONSTRAINT "pages_blocks_content_grid_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid_cells"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_grid" ADD CONSTRAINT "pages_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_grid_locales" ADD CONSTRAINT "pages_blocks_content_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_grid_cells" ADD CONSTRAINT "_pages_v_blocks_content_grid_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_grid_cells_locales" ADD CONSTRAINT "_pages_v_blocks_content_grid_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid_cells"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_grid" ADD CONSTRAINT "_pages_v_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_grid_locales" ADD CONSTRAINT "_pages_v_blocks_content_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_grid_cells_order_idx" ON "pages_blocks_content_grid_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_grid_cells_parent_id_idx" ON "pages_blocks_content_grid_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_content_grid_cells_locales_locale_parent_id_unique" ON "pages_blocks_content_grid_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_grid_order_idx" ON "pages_blocks_content_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_grid_parent_id_idx" ON "pages_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_grid_path_idx" ON "pages_blocks_content_grid" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_content_grid_locales_locale_parent_id_unique" ON "pages_blocks_content_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_cells_order_idx" ON "_pages_v_blocks_content_grid_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_cells_parent_id_idx" ON "_pages_v_blocks_content_grid_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_cells_locales_locale_parent_id_unique" ON "_pages_v_blocks_content_grid_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_order_idx" ON "_pages_v_blocks_content_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_parent_id_idx" ON "_pages_v_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_path_idx" ON "_pages_v_blocks_content_grid" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_content_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_content_grid_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_grid_cells" CASCADE;
  DROP TABLE "pages_blocks_content_grid_cells_locales" CASCADE;
  DROP TABLE "pages_blocks_content_grid" CASCADE;
  DROP TABLE "pages_blocks_content_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid_cells_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid_locales" CASCADE;
  DROP TYPE "public"."enum_content_grid_variant";`)
}
