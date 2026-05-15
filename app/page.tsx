import { prisma } from "./lib/prisma";
import Header from "./components/Header";
import WorkflowCircle from "./components/WorkflowCircle";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) => {
  const years = await prisma.year.findMany({
    orderBy: { year: "asc" },
    select: { id: true, year: true },
  });

  const resolvedSearchParams = await searchParams;
  const selectedYear = resolvedSearchParams.year
    ? parseInt(resolvedSearchParams.year)
    : years[0]?.year || 0;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <WorkflowCircle years={years} selectedYear={selectedYear} />
    </main>
  );
};

export default page;
