import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_link_type" "enum_link_type" DEFAULT 'reference',
  	"link_link_new_tab" boolean,
  	"link_link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tagline" varchar,
  	"heading_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_link_type" "enum_link_type" DEFAULT 'reference',
  	"link_link_new_tab" boolean,
  	"link_link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_tagline" varchar,
  	"heading_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_service_cards_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_service_cards" ADD CONSTRAINT "_pages_v_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_cards_cards_order_idx" ON "pages_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_cards_cards_parent_id_idx" ON "pages_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_cards_cards_order_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_cards_cards_parent_id_idx" ON "_pages_v_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_cards_order_idx" ON "_pages_v_blocks_service_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_cards_parent_id_idx" ON "_pages_v_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_cards_path_idx" ON "_pages_v_blocks_service_cards" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_service_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards" CASCADE;`)
}
