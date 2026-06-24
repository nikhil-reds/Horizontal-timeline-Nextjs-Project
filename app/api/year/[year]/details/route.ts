import { NextResponse } from "next/server";
import { years } from "@/constants/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  const yearValue = parseInt(year);

  if (isNaN(yearValue)) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  try {
    const yearData = years.find((y) => y.year === yearValue);

    if (!yearData) {
      return NextResponse.json({ error: "Year not found" }, { status: 404 });
    }

    return NextResponse.json(yearData);
  } catch (error) {
    console.error("Error fetching year details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
