"use server";

import {
  addMemoryEntry as saveMemoryEntry,
  deleteMemoryEntry as removeMemoryEntry,
  shareMemoryEntry as saveEventShare,
} from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addMemoryEntry(formData: FormData) {
  const user = await requireUser();
  const date = String(formData.get("date") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();

  if (!date || !description) {
    return;
  }

  const entry = await saveMemoryEntry({
    ownerId: user.id,
    date,
    description,
    category: category || undefined,
  });

  const recipientEmail = String(formData.get("recipientEmail") ?? "").trim();
  if (entry && recipientEmail && user.email) {
    await saveEventShare({
      entryId: entry.id,
      ownerId: user.id,
      recipientEmail,
    });
  }

  revalidatePath("/");
  redirect("/");
}

export async function shareMemoryEntry(formData: FormData) {
  const user = await requireUser();
  const entryId = Number(formData.get("entryId"));
  const recipientEmail = String(formData.get("recipientEmail") ?? "").trim();

  if (!Number.isInteger(entryId) || !recipientEmail || !user.email) return;

  await saveEventShare({
    entryId,
    ownerId: user.id,
    recipientEmail,
  });

  revalidatePath("/");
}

export async function deleteMemoryEntry(formData: FormData) {
  const user = await requireUser();
  const entryId = Number(formData.get("entryId"));

  if (!Number.isInteger(entryId)) return;

  await removeMemoryEntry({ entryId, ownerId: user.id });
  revalidatePath("/");
}
