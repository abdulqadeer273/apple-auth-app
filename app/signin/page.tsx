"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main>
      <h1>Sign in</h1>
      <p>Use your Apple ID to continue.</p>
      <button onClick={() => signIn("apple")}>Sign in with Apple</button>
    </main>
  );
}
