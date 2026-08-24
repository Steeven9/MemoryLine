import { addMemoryEntry } from "@/app/actions/db";
import { getTranslations } from "next-intl/server";

const categories = ["Family", "Work", "Personal", "Travel", "Other"] as const;

export async function EntryForm() {
  const t = await getTranslations("form");
  return (
    <form
      action={addMemoryEntry}
      className="rounded border border-stone-300 bg-stone-50 max-w-3xl m-auto p-4 shadow-[2px_2px_0_0_rgba(0,0,0,0.08)]"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-wide text-stone-800">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm leading-6 text-stone-600">
          {t("intro")}
          <br />
          {t("sharedIntro")}
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">{t("date")}</span>
          <input
            name="date"
            type="date"
            required
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          />
        </label>

        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">{t("description")}</span>
          <textarea
            name="description"
            rows={4}
            required
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          />
        </label>

        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">{t("category")}</span>
          <select
            name="category"
            defaultValue=""
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          >
            <option value="">{t("uncategorized")}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {t(`categories.${category}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-stone-700">
          <span className="mb-1 block">{t("shareWith")}</span>
          <input
            name="recipientEmail"
            type="email"
            placeholder={t("optionalEmail")}
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-700"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            name="spoiler"
            type="checkbox"
            className="h-4 w-4 rounded border-stone-300 accent-stone-900"
          />
          <span>{t("markSpoiler")}</span>
        </label>

        <button
          type="submit"
          className="w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700"
        >
          {t("save")}
        </button>
      </div>
    </form>
  );
}
