import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_grid_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_promo_card_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_theme_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_promo_card_theme_color_mode" AS ENUM('light', 'dark');
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "theme_color_mode" "enum_pages_blocks_feature_grid_theme_color_mode" DEFAULT 'light';
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "promo_card_theme_color_mode" "enum_pages_blocks_feature_grid_promo_card_theme_color_mode" DEFAULT 'light';
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "theme_color_mode" "enum__pages_v_blocks_feature_grid_theme_color_mode" DEFAULT 'light';
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "promo_card_theme_color_mode" "enum__pages_v_blocks_feature_grid_promo_card_theme_color_mode" DEFAULT 'light';
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_dark";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_dark";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "promo_card_dark" boolean;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "promo_card_dark" boolean;
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "theme_color_mode";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_theme_color_mode";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "theme_color_mode";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN IF EXISTS "promo_card_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_promo_card_theme_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_theme_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_promo_card_theme_color_mode";`)
}
