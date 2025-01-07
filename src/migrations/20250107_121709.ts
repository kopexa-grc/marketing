import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "posts_slug_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_slug_idx";
  ALTER TABLE "posts_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_slug" varchar;
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v_locales" USING btree ("version_slug","_locale");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_slug";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "posts_slug_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_slug_idx";
  ALTER TABLE "posts" ADD COLUMN "slug" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_slug" varchar;
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_slug";`)
}
