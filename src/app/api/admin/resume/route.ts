import { verifySession } from "@/lib/auth";
import { list, put, del } from "@vercel/blob";

const BLOB_PREFIX = "resume/";

export async function GET() {
  if (!(await verifySession())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    if (blobs.length > 0) {
      const blob = blobs[0];
      return Response.json({
        name: blob.pathname.replace(BLOB_PREFIX, ""),
        url: blob.url,
        size: blob.size,
        uploaded: blob.uploadedAt,
      });
    }
  } catch {
    // Blob not configured
  }

  return Response.json({ name: "Sumanraj_Medikondu_Resume.html", fallback: true });
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    // Delete old resume blobs
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    for (const blob of blobs) {
      await del(blob.url);
    }

    const blob = await put(`${BLOB_PREFIX}${file.name}`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return Response.json({ url: blob.url, name: file.name });
  } catch {
    return Response.json(
      { error: "Storage not configured. Set BLOB_READ_WRITE_TOKEN in Vercel." },
      { status: 500 },
    );
  }
}
