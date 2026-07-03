import { list } from "@vercel/blob";
import { experience as defaultExperience, type Experience } from "@/lib/data";

export async function loadExperience(): Promise<Experience[]> {
  try {
    const { blobs } = await list({ prefix: "data/experience.json" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { next: { revalidate: 60 } });
      if (res.ok) return res.json();
    }
  } catch {
    // Blob not configured — use static data
  }
  return defaultExperience;
}
