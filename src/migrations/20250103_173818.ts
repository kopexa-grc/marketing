import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_form_heading_tag" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_form_block_content_layout" AS ENUM('none', 'left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_form_heading_tag" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TABLE IF NOT EXISTS "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"heading" varchar,
  	"heading_tag" "enum_pages_blocks_form_heading_tag" DEFAULT 'h2',
  	"description" jsonb,
  	"content_layout" "enum_form_block_content_layout" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"heading" varchar,
  	"heading_tag" "enum__pages_v_blocks_form_heading_tag" DEFAULT 'h2',
  	"description" jsonb,
  	"content_layout" "enum_form_block_content_layout" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_form_idx" ON "pages_blocks_form" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_form_idx" ON "_pages_v_blocks_form" USING btree ("form_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_form_heading_tag";
  DROP TYPE "public"."enum_form_block_content_layout";
  DROP TYPE "public"."enum__pages_v_blocks_form_heading_tag";`)
}
