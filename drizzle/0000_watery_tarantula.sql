-- Migración inicial registrada con drizzle-kit. `account`, `session`, `user`,
-- `verification` y la tabla `leads` original ya existían en producción (creadas
-- a mano antes de instalar herramientas de migración) — por eso este archivo NO
-- las recrea, solo añade lo nuevo. El snapshot de drizzle-kit (drizzle/meta/0000_snapshot.json)
-- sí refleja el esquema completo, así que las migraciones futuras generarán diffs limpios.

ALTER TABLE "leads" ADD COLUMN "status" text DEFAULT 'cold' NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "status_updated_at" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
CREATE TABLE "lead_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"notes" text,
	"next_notes" text,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "lead_follow_ups" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer NOT NULL,
	"scheduled_at" timestamp NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"note" text,
	"completed_at" timestamp,
	"result_note" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lead_activities" ADD CONSTRAINT "lead_activities_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "lead_follow_ups" ADD CONSTRAINT "lead_follow_ups_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
