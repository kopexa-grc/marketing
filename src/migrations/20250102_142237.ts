import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid_locales" ADD COLUMN "promo_card_label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" ADD COLUMN "promo_card_label" varchar;
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_link_label";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_link_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "promo_card_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "promo_card_link_label" varchar;
  ALTER TABLE "pages_blocks_feature_grid_locales" DROP COLUMN IF EXISTS "promo_card_label";
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" DROP COLUMN IF EXISTS "promo_card_label";`)
}
