import { and, asc, eq, exists, inArray, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { eventShares, memoryEntries } from "./schema";

export type MemoryEntry = {
  id: number;
  ownerId: string | null;
  sharedWith: string[];
  date: string;
  description: string;
  category: string | null;
  spoiler: boolean;
  createdAt: Date | null;
};

let cachedDb: ReturnType<typeof drizzle> | null = null;

async function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (cachedDb) {
    return cachedDb;
  }

  cachedDb = drizzle(process.env.DATABASE_URL);
  return cachedDb;
}

export async function getMemoryEntries(
  ownerId: string,
  email: string,
): Promise<MemoryEntry[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const db = await getDb();
    if (!db) {
      return [];
    }

    const rows = await db
      .select()
      .from(memoryEntries)
      .where(
        or(
          eq(memoryEntries.ownerId, ownerId),
          exists(
            db
              .select({ id: eventShares.id })
              .from(eventShares)
              .where(
                and(
                  eq(eventShares.entryId, memoryEntries.id),
                  eq(eventShares.recipientEmail, email.toLowerCase()),
                ),
              ),
          ),
        ),
      )
      .orderBy(asc(memoryEntries.date));
    const entryIds = rows.map((row) => row.id);
    const shares = entryIds.length
      ? await db
          .select({
            entryId: eventShares.entryId,
            recipientEmail: eventShares.recipientEmail,
          })
          .from(eventShares)
          .where(inArray(eventShares.entryId, entryIds))
      : [];
    const recipientsByEntry = new Map<number, string[]>();
    for (const share of shares) {
      const recipients = recipientsByEntry.get(share.entryId) ?? [];
      recipients.push(share.recipientEmail);
      recipientsByEntry.set(share.entryId, recipients);
    }
    return rows.map((row) => ({
      ...row,
      sharedWith: recipientsByEntry.get(row.id) ?? [],
      spoiler: row.spoiler ?? false,
      createdAt: row.createdAt ? new Date(row.createdAt) : null,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function addMemoryEntry(input: {
  ownerId: string;
  date: string;
  description: string;
  category?: string;
  spoiler?: boolean;
}) {
  const normalizedCategory = input.category?.trim() || null;

  if (!process.env.DATABASE_URL) {
    const entry: MemoryEntry = {
      id: Date.now(),
      ownerId: input.ownerId,
      sharedWith: [],
      date: input.date,
      description: input.description.trim(),
      category: normalizedCategory,
      spoiler: input.spoiler ?? false,
      createdAt: new Date(),
    };

    return entry;
  }

  const db = await getDb();
  if (!db) {
    return null;
  }

  const rows = await db
    .insert(memoryEntries)
    .values({
      ownerId: input.ownerId,
      date: input.date,
      description: input.description.trim(),
      category: normalizedCategory,
      spoiler: input.spoiler ?? false,
    })
    .returning();

  const entry = rows[0];
  return entry ? { ...entry, spoiler: entry.spoiler ?? false } : null;
}

export async function shareMemoryEntry(input: {
  entryId: number;
  ownerId: string;
  recipientEmail: string;
}) {
  const db = await getDb();
  if (!db) return null;

  const recipientEmail = input.recipientEmail.trim().toLowerCase();
  if (!recipientEmail) return null;

  const ownedEntry = await db
    .select({ id: memoryEntries.id })
    .from(memoryEntries)
    .where(
      and(
        eq(memoryEntries.id, input.entryId),
        eq(memoryEntries.ownerId, input.ownerId),
      ),
    )
    .limit(1);
  if (!ownedEntry.length) return null;

  const rows = await db
    .insert(eventShares)
    .values({
      entryId: input.entryId,
      ownerId: input.ownerId,
      recipientEmail,
    })
    .onConflictDoNothing()
    .returning();
  return rows[0] ?? null;
}

export async function deleteMemoryEntry(input: {
  entryId: number;
  ownerId: string;
}) {
  const db = await getDb();
  if (!db) return null;

  const rows = await db
    .delete(memoryEntries)
    .where(
      and(
        eq(memoryEntries.id, input.entryId),
        eq(memoryEntries.ownerId, input.ownerId),
      ),
    )
    .returning({ id: memoryEntries.id });

  return rows[0] ?? null;
}
