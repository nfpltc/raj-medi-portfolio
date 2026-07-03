import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!verifyPassword(password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }
  await createSession();
  return Response.json({ ok: true });
}
