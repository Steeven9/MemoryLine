"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export function SignOutButton() {
  const t = useTranslations("actions");
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
      className="text-xs text-stone-500 underline underline-offset-4 hover:text-stone-900"
    >
      {t("signOut")}
    </button>
  );
}
