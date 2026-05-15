import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const years = [2006, 2009, 2012, 2015, 2017, 2019, 2021, 2022, 2023, 2024, 2025, 2026];
  for (const year of years) {
    await prisma.year.upsert({
      where: { year },
      update: {},
      create: { year },
    });
  }
  console.log("Seeded years:", years);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
