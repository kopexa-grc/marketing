import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_grid_layout" AS ENUM('grid', 'list', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_headline_alignment" AS ENUM('center', 'left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_promo_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_layout" AS ENUM('grid', 'list', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_headline_alignment" AS ENUM('center', 'left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_promo_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('twitter', 'linkedin', 'github', 'instagram');
  CREATE TYPE "public"."enum_footer_social_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_feature_grid_layout" DEFAULT 'grid',
  	"headline_title" varchar,
  	"headline_description" varchar,
  	"headline_alignment" "enum_pages_blocks_feature_grid_headline_alignment" DEFAULT 'center',
  	"show_promo_card" boolean DEFAULT false,
  	"promo_card_dark" boolean,
  	"promo_card_title" varchar,
  	"promo_card_description" varchar,
  	"promo_card_link_type" "enum_pages_blocks_feature_grid_promo_card_link_type" DEFAULT 'reference',
  	"promo_card_link_new_tab" boolean,
  	"promo_card_link_url" varchar,
  	"promo_card_link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_feature_grid_layout" DEFAULT 'grid',
  	"headline_title" varchar,
  	"headline_description" varchar,
  	"headline_alignment" "enum__pages_v_blocks_feature_grid_headline_alignment" DEFAULT 'center',
  	"show_promo_card" boolean DEFAULT false,
  	"promo_card_dark" boolean,
  	"promo_card_title" varchar,
  	"promo_card_description" varchar,
  	"promo_card_link_type" "enum__pages_v_blocks_feature_grid_promo_card_link_type" DEFAULT 'reference',
  	"promo_card_link_new_tab" boolean,
  	"promo_card_link_url" varchar,
  	"promo_card_link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"link_type" "enum_footer_social_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "footer" ADD COLUMN "legal_copyright_text" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_grid_cards" ADD CONSTRAINT "pages_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_grid_cards" ADD CONSTRAINT "_pages_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_grid_cards_order_idx" ON "pages_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_grid_cards_parent_id_idx" ON "pages_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_cards_order_idx" ON "_pages_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_cards_parent_id_idx" ON "_pages_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "legal_copyright_text";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_layout";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_headline_alignment";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_promo_card_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_layout";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_headline_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_promo_card_link_type";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_footer_social_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";`)
}
