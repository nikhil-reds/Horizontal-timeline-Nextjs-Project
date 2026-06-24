import { NextResponse } from "next/server";
import { years } from "@/constants/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const yearId = parseInt(id);

  if (isNaN(yearId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const year = years.find((y) => y.id === yearId);

    if (!year) {
      return NextResponse.json({ error: "Year not found" }, { status: 404 });
    }

    return NextResponse.json({ about: year.about });
  } catch (error) {
    console.error("Error fetching about text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
