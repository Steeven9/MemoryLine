"use client";

import { DeleteEntryButton } from "@/components/delete-entry-button";
import type { MemoryEntry } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export function Timeline({
  entries,
  userId,
}: Readonly<{ entries: MemoryEntry[]; userId: string }>) {
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
        </div>
        <span className="rounded border border-stone-300 bg-white px-2 py-1 text-stone-500">
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
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-stone-800">
                      {formatDate(entry.date)}
                    </p>
                    {entry.sharedWith.length > 0 && (
                      <span
                        className="group relative inline-flex text-stone-500"
                        title={`Shared with ${entry.sharedWith.join(", ")}`}
                        aria-label={`Shared with ${entry.sharedWith.join(", ")}`}
                      >
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="9" cy="8" r="3" />
                          <path d="M3.5 20c.5-3.2 2.3-5 5.5-5s5 1.8 5.5 5" />
                          <path d="M16 11a3 3 0 1 0 0-6" />
                          <path d="M17 15c2.1.3 3.3 1.9 3.5 5" />
                        </svg>
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-stone-900 px-2 py-1 text-xs font-normal normal-case tracking-normal text-stone-50 shadow group-hover:block">
                          Shared with {entry.sharedWith.join(", ")}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500">
                      {entry.category ?? "Uncategorized"}
                    </span>
                    {entry.ownerId === userId && (
                      <DeleteEntryButton entryId={entry.id} />
                    )}
                  </div>
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
