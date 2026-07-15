import { EntryForm } from "@/components/entry-form";
import { Timeline } from "@/components/timeline";
import { getMemoryEntries } from "@/lib/db";

export default async function Home() {
  const entries = await getMemoryEntries();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded border border-stone-300 bg-stone-50 p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.08)]">
        <p className="text-sm uppercase tracking-[0.4em] text-stone-500">
          MemoryLine
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Keep the dates that matter close at hand.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
          Add a day, describe why it matters, and see the timeline fill up!
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <EntryForm />
        <Timeline entries={entries} />
      </section>
    </main>
  );
}

export const dynamic = "force-dynamic";
