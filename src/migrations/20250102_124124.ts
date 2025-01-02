import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid_cards_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_card_grid_cards_locales" DROP COLUMN IF EXISTS "link_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_card_grid_cards_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards_locales" ADD COLUMN "link_label" varchar;`)
}
