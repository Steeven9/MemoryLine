"use client";

import { deleteMemoryEntry } from "@/app/actions";

export function DeleteEntryButton({ entryId }: Readonly<{ entryId: number }>) {
  return (
    <form
      action={deleteMemoryEntry}
      onSubmit={(event) => {
        if (!window.confirm("Delete this event permanently?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="entryId" value={entryId} />
      <button
        type="submit"
        aria-label="Delete event"
        title="Delete event"
        className="text-red-600 transition-colors hover:text-red-800"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M4 7h16" />
          <path d="M10 11v6M14 11v6" />
          <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
        </svg>
      </button>
    </form>
  );
}
