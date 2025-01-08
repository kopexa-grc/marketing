import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_feature_section_feature_mediatype" AS ENUM('none', 'icon', 'media');
  CREATE TYPE "public"."enum_pages_blocks_feature_section_links_link_appearance" AS ENUM('default', 'outline', 'link');
  CREATE TYPE "public"."enum_feature_section_variants" AS ENUM('variantOne');
  CREATE TYPE "public"."enum_heading_field_tag" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_heading_field_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_section_links_link_appearance" AS ENUM('default', 'outline', 'link');
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_feature_section_feature_mediatype" DEFAULT 'none',
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_section_features_locales" (
  	"headline" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_feature_section_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_section_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_feature_section_variants" DEFAULT 'variantOne',
  	"heading_tag" "enum_heading_field_tag" DEFAULT 'h2',
  	"heading_level" "enum_heading_field_level" DEFAULT '2',
  	"description" jsonb,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_section_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum_feature_section_feature_mediatype" DEFAULT 'none',
  	"icon" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_section_features_locales" (
  	"headline" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_feature_section_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_section_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum_feature_section_variants" DEFAULT 'variantOne',
  	"heading_tag" "enum_heading_field_tag" DEFAULT 'h2',
  	"heading_level" "enum_heading_field_level" DEFAULT '2',
  	"description" jsonb,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_section_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section_features" ADD CONSTRAINT "pages_blocks_feature_section_features_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section_features" ADD CONSTRAINT "pages_blocks_feature_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section_features_locales" ADD CONSTRAINT "pages_blocks_feature_section_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_section_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section_links" ADD CONSTRAINT "pages_blocks_feature_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section_links_locales" ADD CONSTRAINT "pages_blocks_feature_section_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_section_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section" ADD CONSTRAINT "pages_blocks_feature_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section" ADD CONSTRAINT "pages_blocks_feature_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_section_locales" ADD CONSTRAINT "pages_blocks_feature_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section_features" ADD CONSTRAINT "_pages_v_blocks_feature_section_features_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section_features" ADD CONSTRAINT "_pages_v_blocks_feature_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section_features_locales" ADD CONSTRAINT "_pages_v_blocks_feature_section_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_section_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section_links" ADD CONSTRAINT "_pages_v_blocks_feature_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section_links_locales" ADD CONSTRAINT "_pages_v_blocks_feature_section_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_section_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section" ADD CONSTRAINT "_pages_v_blocks_feature_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section" ADD CONSTRAINT "_pages_v_blocks_feature_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_section_locales" ADD CONSTRAINT "_pages_v_blocks_feature_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_features_order_idx" ON "pages_blocks_feature_section_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_features_parent_id_idx" ON "pages_blocks_feature_section_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_features_media_idx" ON "pages_blocks_feature_section_features" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_feature_section_features_locales_locale_parent_id_unique" ON "pages_blocks_feature_section_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_links_order_idx" ON "pages_blocks_feature_section_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_links_parent_id_idx" ON "pages_blocks_feature_section_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_feature_section_links_locales_locale_parent_id_unique" ON "pages_blocks_feature_section_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_order_idx" ON "pages_blocks_feature_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_parent_id_idx" ON "pages_blocks_feature_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_path_idx" ON "pages_blocks_feature_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_section_media_idx" ON "pages_blocks_feature_section" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_feature_section_locales_locale_parent_id_unique" ON "pages_blocks_feature_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_features_order_idx" ON "_pages_v_blocks_feature_section_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_features_parent_id_idx" ON "_pages_v_blocks_feature_section_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_features_media_idx" ON "_pages_v_blocks_feature_section_features" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_features_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_section_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_links_order_idx" ON "_pages_v_blocks_feature_section_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_links_parent_id_idx" ON "_pages_v_blocks_feature_section_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_section_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_order_idx" ON "_pages_v_blocks_feature_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_parent_id_idx" ON "_pages_v_blocks_feature_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_path_idx" ON "_pages_v_blocks_feature_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_media_idx" ON "_pages_v_blocks_feature_section" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_feature_section_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_section_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_feature_section_features" CASCADE;
  DROP TABLE "pages_blocks_feature_section_features_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_section_links" CASCADE;
  DROP TABLE "pages_blocks_feature_section_links_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_section" CASCADE;
  DROP TABLE "pages_blocks_feature_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_section_features" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_section_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_section_links" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_section_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_section" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_section_locales" CASCADE;
  DROP TYPE "public"."enum_feature_section_feature_mediatype";
  DROP TYPE "public"."enum_pages_blocks_feature_section_links_link_appearance";
  DROP TYPE "public"."enum_feature_section_variants";
  DROP TYPE "public"."enum_heading_field_tag";
  DROP TYPE "public"."enum_heading_field_level";
  DROP TYPE "public"."enum__pages_v_blocks_feature_section_links_link_appearance";`)
}
