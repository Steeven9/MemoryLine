"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
      className="text-xs text-stone-500 underline underline-offset-4 hover:text-stone-900"
    >
      Sign out
    </button>
  );
}
