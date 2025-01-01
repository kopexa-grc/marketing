import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "main_menu_tabs_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_locales" ADD COLUMN "hero_tagline" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_heading" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_description" jsonb;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_tagline" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_heading" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_description" jsonb;
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_locales" ADD CONSTRAINT "main_menu_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "main_menu_tabs_locales_locale_parent_id_unique" ON "main_menu_tabs_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_tagline";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_heading";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_tagline";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_heading";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_description";
  ALTER TABLE "main_menu_tabs" DROP COLUMN IF EXISTS "label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "main_menu_tabs_locales" CASCADE;
  ALTER TABLE "pages" ADD COLUMN "hero_tagline" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_description" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_tagline" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_description" jsonb;
  ALTER TABLE "main_menu_tabs" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_tagline";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_heading";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_description";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_tagline";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_heading";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_description";`)
}
