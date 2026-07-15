"use server";

import { addMemoryEntry as saveMemoryEntry } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addMemoryEntry(formData: FormData) {
  const date = String(formData.get("date") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();

  if (!date || !description) {
    return;
  }

  await saveMemoryEntry({
    date,
    description,
    category: category || undefined,
  });

  revalidatePath("/");
  redirect("/");
}
