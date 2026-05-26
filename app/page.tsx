import { prisma } from "./lib/prisma";
import TimelineCanvas from "./components/TimelineCanvas";
import TimelineContainer from "./components/TimelineContainer";

export const revalidate = 0; // Disable static rendering caching to allow dynamic updates

export default async function Home() {
  let dbYears: Array<{
    id: number;
    year: number;
    about: string | null;
    achievements: Array<{
      id: number;
      title: string;
      category: string;
      date: Date | string;
    }>;
    assets: Array<{
      id: number;
      url: string;
      caption: string | null;
      month: number;
    }>;
  }> = [];

  try {
    dbYears = await prisma.year.findMany({
      include: {
        achievements: {
          orderBy: { date: "asc" },
        },
        assets: {
          orderBy: { month: "asc" },
        },
      },
      orderBy: { year: "asc" },
    });
  } catch (error) {
    console.warn(
      "Database connection could not be established or has not been initialized. Falling back to static Foundry timeline data.",
      error
    );
  }

  return (
    <main className="h-screen relative overflow-hidden bg-(--ink-2) text-(--text-1) select-none">
      <div className="timeline-backdrop" />
      <TimelineCanvas />
      <TimelineContainer initialYears={dbYears} />
    </main>
  );
}
