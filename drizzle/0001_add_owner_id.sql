ALTER TABLE "memory_entries" ADD COLUMN "owner_id" text;
CREATE INDEX "memory_entries_owner_id_idx" ON "memory_entries" ("owner_id");