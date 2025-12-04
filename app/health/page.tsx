import { requireEnv } from "../../lib/env";

export default function Health() {
  let status: Array<{ name: string; ok: boolean; message?: string }> = [];
  const must = ["APPLE_CLIENT_ID", "APPLE_CLIENT_SECRET", "NEXTAUTH_SECRET"];
  const optional = ["NEXTAUTH_URL"];

  for (const name of must) {
    try {
      requireEnv(name);
      status.push({ name, ok: true });
    } catch (e: any) {
      status.push({ name, ok: false, message: e?.message || String(e) });
    }
  }
  for (const name of optional) {
    const v = process.env[name];
    status.push({ name, ok: !!(v && v.trim() !== ""), message: v ? undefined : "not set" });
  }

  return (
    <main>
      <h1>Health Check</h1>
      <p>Environment validation for Apple/NextAuth</p>
      <ul>
        {status.map((s) => (
          <li key={s.name}>
            <strong>{s.name}:</strong> {s.ok ? "OK" : "Missing"}
            {s.message ? ` – ${s.message}` : ""}
          </li>
        ))}
      </ul>
      <p>
        If APPLE_CLIENT_SECRET is expired, regenerate the JWT and update
        Netlify envs.
      </p>
    </main>
  );
}
