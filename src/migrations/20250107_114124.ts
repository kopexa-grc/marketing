import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "posts_table_of_contents" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "lexical_content" jsonb;
  ALTER TABLE "_posts_v_version_table_of_contents" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_lexical_content" jsonb;
  DO $$ BEGIN
   ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_table_of_contents_locale_idx" ON "posts_table_of_contents" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_table_of_contents_locale_idx" ON "_posts_v_version_table_of_contents" USING btree ("_locale");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "excerpt";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "lexical_content";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_lexical_content";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "categories_locales" CASCADE;
  DROP INDEX IF EXISTS "posts_table_of_contents_locale_idx";
  DROP INDEX IF EXISTS "_posts_v_version_table_of_contents_locale_idx";
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "lexical_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_lexical_content" jsonb;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "description" varchar;
  ALTER TABLE "posts_table_of_contents" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "excerpt";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "lexical_content";
  ALTER TABLE "_posts_v_version_table_of_contents" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_excerpt";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_lexical_content";`)
}
