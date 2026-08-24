import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const memoryEntries = pgTable("memory_entries", {
  id: serial("id").primaryKey(),
  ownerId: text("owner_id").notNull(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  category: text("category"),
  spoiler: boolean("spoiler").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const eventShares = pgTable(
  "event_shares",
  {
    id: serial("id").primaryKey(),
    entryId: integer("entry_id")
      .notNull()
      .references(() => memoryEntries.id, { onDelete: "cascade" }),
    ownerId: text("owner_id").notNull(),
    recipientEmail: text("recipient_email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    uniqueIndex("event_shares_entry_recipient_idx").on(
      table.entryId,
      table.recipientEmail,
    ),
  ],
);
