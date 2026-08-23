import { asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { memoryEntries } from "./schema";

export type MemoryEntry = {
  id: number;
  date: string;
  description: string;
  category: string | null;
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
      .where(eq(memoryEntries.ownerId, ownerId))
      .orderBy(asc(memoryEntries.date));
    return rows.map((row) => ({
      ...row,
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
}) {
  const normalizedCategory = input.category?.trim() || null;

  if (!process.env.DATABASE_URL) {
    const entry: MemoryEntry = {
      id: Date.now(),
      date: input.date,
      description: input.description.trim(),
      category: normalizedCategory,
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
    })
    .returning();

  return rows[0] ?? null;
}
