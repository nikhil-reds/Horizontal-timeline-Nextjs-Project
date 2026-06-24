import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const filePathArray = resolvedParams.path;
  
  // Resolve path to the file in the components directory
  const rootDir = process.cwd();
  const fileFullPath = path.join(rootDir, "components", ...filePathArray);

  // Simple mime-type mapping
  const ext = path.extname(fileFullPath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  try {
    if (!fs.existsSync(fileFullPath) || fs.statSync(fileFullPath).isDirectory()) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(fileFullPath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving goghwiththeflow asset:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
