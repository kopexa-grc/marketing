import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "main_menu_tabs_lower_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"link_type" "enum_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_lower_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_lower_links" ADD CONSTRAINT "main_menu_tabs_lower_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_lower_links" ADD CONSTRAINT "main_menu_tabs_lower_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_lower_links_locales" ADD CONSTRAINT "main_menu_tabs_lower_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs_lower_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_lower_links_order_idx" ON "main_menu_tabs_lower_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_lower_links_parent_id_idx" ON "main_menu_tabs_lower_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_lower_links_icon_idx" ON "main_menu_tabs_lower_links" USING btree ("icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "main_menu_tabs_lower_links_locales_locale_parent_id_unique" ON "main_menu_tabs_lower_links_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "main_menu_tabs_lower_links" CASCADE;
  DROP TABLE "main_menu_tabs_lower_links_locales" CASCADE;`)
}
