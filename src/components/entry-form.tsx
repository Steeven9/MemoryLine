import { addMemoryEntry } from "@/app/actions";

const categories = ["Family", "Work", "Personal", "Travel", "Other"];

export function EntryForm() {
  return (
    <form
      action={addMemoryEntry}
      className="rounded border border-stone-300 bg-stone-50 p-4 shadow-[2px_2px_0_0_rgba(0,0,0,0.08)]"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide text-stone-800">
          Add a date
        </h2>
        <p className="mt-1 text-sm leading-6 text-stone-600">
          Record the day, describe why it matters, and add a category if you
          want.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">Date*</span>
          <input
            name="date"
            type="date"
            required
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          />
        </label>

        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">Description*</span>
          <textarea
            name="description"
            rows={4}
            required
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          />
        </label>

        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">Category</span>
          <select
            name="category"
            defaultValue=""
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          >
            <option value="">Uncategorized</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">Share with</span>
          <input
            name="recipientEmail"
            type="email"
            placeholder="name@example.com (optional)"
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700"
        >
          Save note
        </button>
      </div>
    </form>
  );
}
