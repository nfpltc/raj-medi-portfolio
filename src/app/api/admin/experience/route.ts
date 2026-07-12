import { verifySession } from "@/lib/auth";
import { list, put, del } from "@vercel/blob";
import { experience as defaultExperience } from "@/lib/data";

const BLOB_KEY = "data/experience.json";

export async function GET() {
  if (!(await verifySession())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      const data = await res.json();
      return Response.json(data);
    }
  } catch {
    // Blob store not configured — fall back
  }

  return Response.json(defaultExperience);
}

export async function PUT(request: Request) {
  if (!(await verifySession())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();

  try {
    // Delete old blob if exists
    const { blobs } = await list({ prefix: BLOB_KEY });
    for (const blob of blobs) {
      await del(blob.url);
    }

    // Write new
    await put(BLOB_KEY, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: "Storage not configured. Set BLOB_READ_WRITE_TOKEN in Vercel." },
      { status: 500 },
    );
  }
}
