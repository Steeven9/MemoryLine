CREATE TABLE "memory_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"description" text NOT NULL,
	"category" text,
	"created_at" timestamp with time zone DEFAULT now()
);
