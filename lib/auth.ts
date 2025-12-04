import type { NextAuthOptions } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import { requireEnv, getOptionalEnv } from "./env";

// Validate required envs early to fail with a clear message
const APPLE_CLIENT_ID = requireEnv("APPLE_CLIENT_ID");
const APPLE_CLIENT_SECRET = requireEnv("APPLE_CLIENT_SECRET");
const NEXTAUTH_SECRET = requireEnv("NEXTAUTH_SECRET");
const NEXTAUTH_URL = getOptionalEnv("NEXTAUTH_URL");

export const authOptions: NextAuthOptions = {
  providers: [
    AppleProvider({
      clientId: APPLE_CLIENT_ID,
      clientSecret: APPLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  secret: NEXTAUTH_SECRET,
};

// Optional: warn if NEXTAUTH_URL is missing in production
if (process.env.NODE_ENV === "production" && !NEXTAUTH_URL) {
  console.warn(
    "NEXTAUTH_URL is not set. Set it to your Netlify site URL for correct callbacks."
  );
}
