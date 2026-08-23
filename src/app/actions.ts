"use server";

import { addMemoryEntry as saveMemoryEntry } from "@/lib/db";
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

  await saveMemoryEntry({
    ownerId: user.id,
    date,
    description,
    category: category || undefined,
  });

  revalidatePath("/");
  redirect("/");
}
