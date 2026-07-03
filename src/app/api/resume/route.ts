import { list } from "@vercel/blob";

export async function GET() {
  // Try Vercel Blob first (admin-uploaded resume)
  try {
    const { blobs } = await list({ prefix: "resume/" });
    if (blobs.length > 0) {
      return Response.redirect(blobs[0].url);
    }
  } catch {
    // Blob not configured — fall through to static file
  }

  // Fall back to static resume in /public
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3030";
  return Response.redirect(`${base}/Sumanraj_Medikondu_Resume.html`);
}
