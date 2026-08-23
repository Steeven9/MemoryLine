"use client";

import { useState } from "react";
import type { MemoryEntry } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export function Timeline({ entries }: Readonly<{ entries: MemoryEntry[] }>) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = Array.from(
    new Set(entries.map((entry) => entry.category ?? "Uncategorized")),
  ).sort((first, second) => first.localeCompare(second));
  const filteredEntries =
    activeCategory === "all"
      ? entries
      : entries.filter(
          (entry) => (entry.category ?? "Uncategorized") === activeCategory,
        );

  if (!entries.length) {
    return (
      <div className="rounded border border-stone-300 bg-stone-50 p-6 text-sm leading-6 text-stone-600 shadow-[2px_2px_0_0_rgba(0,0,0,0.08)]">
        No notes yet. Add the first important date to begin the timeline.
      </div>
    );
  }

  return (
    <div className="rounded border border-stone-300 bg-stone-50 p-4 shadow-[2px_2px_0_0_rgba(0,0,0,0.08)]">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-wide text-stone-800">
            Timeline
          </h2>
          <p className="mt-1 text-sm leading-6 text-stone-600">
            A simple line of the dates that matter.
          </p>
        </div>
        <span className="rounded border border-stone-300 bg-white px-2 py-1 text-xs uppercase tracking-[0.25em] text-stone-500">
          {filteredEntries.length} entries
        </span>
      </div>

      <fieldset className="mb-5 flex flex-wrap gap-2">
        <legend className="sr-only">Filter timeline by category</legend>
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={`rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === "all"
              ? "border-stone-800 bg-stone-900 text-stone-50"
              : "border-stone-300 bg-white text-stone-600 hover:border-stone-600 hover:text-stone-900"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === category
                ? "border-stone-800 bg-stone-900 text-stone-50"
                : "border-stone-300 bg-white text-stone-600 hover:border-stone-600 hover:text-stone-900"
            }`}
          >
            {category}
          </button>
        ))}
      </fieldset>

      {filteredEntries.length ? (
        <ol className="space-y-3 border-l border-stone-300 pl-5">
          {filteredEntries.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute left-[-1.35rem] top-3 h-3 w-3 rounded-full border border-stone-700 bg-stone-100" />
              <article className="rounded border border-stone-300 bg-white p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-stone-800">
                    {formatDate(entry.date)}
                  </p>
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                    {entry.category ?? "Uncategorized"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-700">
                  {entry.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded border border-dashed border-stone-300 bg-white p-4 text-sm text-stone-600">
          No notes in this category.
        </p>
      )}
    </div>
  );
}
