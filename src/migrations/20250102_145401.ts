import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_menu_ctas" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "footer_columns_nav_items_locales" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "footer_legal_links" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_card_grid_cards_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "promo_card_link_label" varchar;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD COLUMN "link_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "promo_card_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_service_cards_cards" ADD COLUMN "link_link_label" varchar;
  ALTER TABLE "main_menu_tabs_nav_items_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "main_menu_tabs" ADD COLUMN "link_label" varchar;
  ALTER TABLE "footer_social_links" ADD COLUMN "link_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_menu_ctas" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "footer_columns_nav_items_locales" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "footer_legal_links" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "pages_blocks_card_grid_cards_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_link_label";
  ALTER TABLE "pages_blocks_service_cards_cards" DROP COLUMN IF EXISTS "link_link_label";
  ALTER TABLE "_pages_v_blocks_card_grid_cards_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_link_label";
  ALTER TABLE "_pages_v_blocks_service_cards_cards" DROP COLUMN IF EXISTS "link_link_label";
  ALTER TABLE "main_menu_tabs_nav_items_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "main_menu_tabs" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "footer_social_links" DROP COLUMN IF EXISTS "link_label";`)
}
