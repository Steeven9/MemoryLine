CREATE TABLE "event_shares" (
  "id" serial PRIMARY KEY NOT NULL,
  "entry_id" integer NOT NULL,
  "owner_id" text NOT NULL,
  "recipient_email" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  CONSTRAINT "event_shares_entry_id_memory_entries_id_fk" FOREIGN KEY ("entry_id") REFERENCES "memory_entries"("id") ON DELETE cascade
);
CREATE UNIQUE INDEX "event_shares_entry_recipient_idx" ON "event_shares" ("entry_id", "recipient_email");