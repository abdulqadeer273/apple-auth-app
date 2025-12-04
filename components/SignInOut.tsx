"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInOut() {
  const { data: session, status } = useSession();

  if (status === "loading") return <button disabled>Loading…</button>;

  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }

  return <button onClick={() => signIn("apple")}>Sign in with Apple</button>;
}
