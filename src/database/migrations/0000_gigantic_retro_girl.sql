CREATE TYPE "public"."status" AS ENUM('open', 'paid', 'void', 'uncollectable');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"status" "status",
	"amount" integer NOT NULL,
	"description" text NOT NULL
);
