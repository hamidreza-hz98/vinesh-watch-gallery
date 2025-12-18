import { serveMediaBuffer } from "@/app/actions/media";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { filename } = await params

    // Decode filename to handle slashes correctly
    const fileName = decodeURIComponent(filename);

    // Fetch buffer + content type from B2
    const { buffer, contentType } = await serveMediaBuffer(fileName);

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
      },
    });
  } catch (err) {
    console.error("serveMedia error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
