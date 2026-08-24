import { EntryForm } from "@/components/entry-form";
import { SignOutButton } from "@/components/sign-out-button";
import { Timeline } from "@/components/timeline";
import { requireUser } from "@/lib/auth";
import { getMemoryEntries } from "@/lib/db";

export default async function Home() {
  const user = await requireUser();
  const entries = await getMemoryEntries(user.id, user.email ?? "");

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded border border-stone-300 bg-stone-50 p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.08)]">
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          MemoryLine
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
          A simple way of keeping track of the dates that matter.
        </p>
        <div className="mt-2 flex justify-end gap-4">
          <p className="text-stone-500">{user.email}</p>
          <SignOutButton />
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <EntryForm />
        <Timeline entries={entries} userId={user.id} />
      </section>
    </main>
  );
}

export const dynamic = "force-dynamic";
