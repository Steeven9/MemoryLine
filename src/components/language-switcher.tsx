"use client";

import { changeLocaleAction } from "@/app/actions/language";

export function LanguageSwitcher({
  locale,
  label,
  english,
  italian,
}: Readonly<{
  locale: string;
  label: string;
  english: string;
  italian: string;
}>) {
  return (
    <label className="flex items-center gap-2 text-xs text-stone-600">
      <span>{label}</span>
      <select
        value={locale}
        onChange={(event) => changeLocaleAction(event.target.value)}
        className="rounded border border-stone-300 bg-white px-2 py-1 outline-none focus:border-stone-700"
        aria-label={label}
      >
        <option value="en">{english}</option>
        <option value="it">{italian}</option>
      </select>
    </label>
  );
}
