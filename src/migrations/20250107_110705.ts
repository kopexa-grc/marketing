import {
  MigrateUpArgs,
  MigrateDownArgs,
  sql,
} from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de');
  ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum_pages_blocks_promo_card_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum__pages_v_blocks_promo_card_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum_main_menu_ctas_link_appearance" ADD VALUE 'link';
  CREATE TABLE IF NOT EXISTS "pages_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"number_of_articles" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_latest_articles_locales" (
  	"heading" varchar DEFAULT 'Latest Articles',
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_latest_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"number_of_articles" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_latest_articles_locales" (
  	"heading" varchar DEFAULT 'Latest Articles',
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_table_of_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"level" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"excerpt" varchar,
  	"lexical_content" jsonb,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"published_on" timestamp(3) with time zone,
  	"category_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_table_of_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"level" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_excerpt" varchar,
  	"version_lexical_content" jsonb,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_on" timestamp(3) with time zone,
  	"version_category_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "headline" varchar;
  ALTER TABLE "users" ADD COLUMN "social_links_website" varchar;
  ALTER TABLE "users" ADD COLUMN "social_links_twitter" varchar;
  ALTER TABLE "users" ADD COLUMN "social_links_linkedin" varchar;
  ALTER TABLE "users" ADD COLUMN "social_links_github" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "slug" varchar;
  ALTER TABLE "users" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_articles" ADD CONSTRAINT "pages_blocks_latest_articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_articles" ADD CONSTRAINT "pages_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_articles_locales" ADD CONSTRAINT "pages_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_articles" ADD CONSTRAINT "_pages_v_blocks_latest_articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_articles" ADD CONSTRAINT "_pages_v_blocks_latest_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_articles_locales" ADD CONSTRAINT "_pages_v_blocks_latest_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_latest_articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_table_of_contents" ADD CONSTRAINT "posts_table_of_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_table_of_contents" ADD CONSTRAINT "_posts_v_version_table_of_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_articles_order_idx" ON "pages_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_articles_parent_id_idx" ON "pages_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_articles_path_idx" ON "pages_blocks_latest_articles" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_articles_category_idx" ON "pages_blocks_latest_articles" USING btree ("category_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_latest_articles_locales_locale_parent_id_unique" ON "pages_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_articles_order_idx" ON "_pages_v_blocks_latest_articles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_articles_parent_id_idx" ON "_pages_v_blocks_latest_articles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_articles_path_idx" ON "_pages_v_blocks_latest_articles" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_articles_category_idx" ON "_pages_v_blocks_latest_articles" USING btree ("category_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_latest_articles_locales_locale_parent_id_unique" ON "_pages_v_blocks_latest_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_table_of_contents_order_idx" ON "posts_table_of_contents" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_table_of_contents_parent_id_idx" ON "posts_table_of_contents" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_table_of_contents_order_idx" ON "_posts_v_version_table_of_contents" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_table_of_contents_parent_id_idx" ON "_posts_v_version_table_of_contents" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_slug_idx" ON "users" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_theme_color_mode";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_theme_color_mode";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_latest_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_latest_articles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_latest_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_latest_articles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_table_of_contents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_table_of_contents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_latest_articles" CASCADE;
  DROP TABLE "pages_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_articles" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_articles_locales" CASCADE;
  DROP TABLE "posts_table_of_contents" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_table_of_contents" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  DROP INDEX IF EXISTS "users_slug_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_theme_color_mode" "enum_theme_color_mode" DEFAULT 'light';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_theme_color_mode" "enum_theme_color_mode" DEFAULT 'light';
  ALTER TABLE "users" DROP COLUMN IF EXISTS "headline";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "social_links_website";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "social_links_twitter";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "social_links_linkedin";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "social_links_github";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "categories_id";
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_hero_links_link_appearance" USING "link_appearance"::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "public"."pages_blocks_promo_card" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_promo_card_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_promo_card_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."pages_blocks_promo_card" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_promo_card_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_promo_card_link_appearance";
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_promo_card" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_promo_card_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_promo_card_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."_pages_v_blocks_promo_card" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_promo_card_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_promo_card_link_appearance";
  ALTER TABLE "public"."main_menu_ctas" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_main_menu_ctas_link_appearance";
  CREATE TYPE "public"."enum_main_menu_ctas_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "public"."main_menu_ctas" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_main_menu_ctas_link_appearance" USING "link_appearance"::"public"."enum_main_menu_ctas_link_appearance";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";`);
}
