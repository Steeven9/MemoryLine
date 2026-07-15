import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const memoryEntries = pgTable("memory_entries", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  category: text("category"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
