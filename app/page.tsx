import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import SignInOut from "../components/SignInOut";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Apple Auth Demo</h1>
      <p>
        {session ? (
          <>Signed in as {session.user?.email || session.user?.name}</>
        ) : (
          <>Not signed in</>
        )}
      </p>
      <SignInOut />
      <p style={{ marginTop: 16 }}>
        <Link href="/dashboard">Go to dashboard</Link>
      </p>
      <p>
        <Link href="/signin">Open sign-in page</Link>
      </p>
    </main>
  );
}
