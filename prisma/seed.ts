import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const seedData = [
  {
    year: 2008,
    about: "Four engineers, one spreadsheet, and a refinery turnaround that nobody else wanted. Foundry began as a service contract — keep the schedule honest, keep the procurement log clean, keep the field reporting up to date.",
    achievements: [
      {
        title: "A controls team forms in a portable trailer outside Baytown.",
        category: "Origin",
        date: new Date("2008-05-15"),
      },
    ],
    assets: [
      {
        url: "/extracted_ui/uploads/Screenshot 2026-05-25 at 12.59.32 PM.png",
        caption: "Team trailer outside Baytown refinery turnaround",
        month: 5,
      },
    ],
  },
  {
    year: 2011,
    about: "What started as an internal workbook for daily reports becomes Foundry's first piece of software. Three EPC contractors sign on within six months. The product roadmap is written in pencil, on the back of a P&ID.",
    achievements: [
      {
        title: "Field Log ships — the spreadsheet finally leaves the trailer.",
        category: "Product",
        date: new Date("2011-09-10"),
      },
    ],
    assets: [],
  },
  {
    year: 2014,
    about: "The PO log lands in the same database as the field report. Project controllers stop reconciling between Primavera, Excel and email. Foundry now sits between the trailer and the home office on every project it touches.",
    achievements: [
      {
        title: "Procurement and Schedule launch. One platform, three desks.",
        category: "Expansion",
        date: new Date("2014-04-18"),
      },
    ],
    assets: [],
  },
  {
    year: 2017,
    about: "The first multi-currency, multi-language deployment lands with a Dutch midstream operator. Within eighteen months Foundry runs the controls cadence on projects across nineteen countries and four continents.",
    achievements: [
      {
        title: "Rotterdam and Singapore come online — coverage follows the shipping lanes.",
        category: "Scale",
        date: new Date("2017-10-05"),
      },
    ],
    assets: [],
  },
  {
    year: 2020,
    about: "The mobile app — quietly in development for two years — is pulled forward and shipped in eleven weeks. Superintendents file punch lists from their phones at half-capacity sites. Not a single customer cancels.",
    achievements: [
      {
        title: "Site offices empty. Foundry Field carries the load.",
        category: "Resilience",
        date: new Date("2020-06-20"),
      },
    ],
    assets: [],
  },
  {
    year: 2022,
    about: "Variance forecasting goes live across every active baseline. Twelve years of schedule and cost history finally pay a dividend. Foundry Intelligence forecasts EVM variance four weeks out at a 86% confidence interval.",
    achievements: [
      {
        title: "Variance forecasting goes live across every active baseline.",
        category: "Intelligence",
        date: new Date("2022-11-12"),
      },
    ],
    assets: [],
  },
  {
    year: 2024,
    about: "Two-thirds of the Engineering News-Record Top 100 sit on the platform. The blueprint view — the one drawn on a whiteboard in 2009 — quietly becomes the way most of the industry plans a turnaround.",
    achievements: [
      {
        title: "$200B of capital projects now run through Foundry.",
        category: "Milestone",
        date: new Date("2024-03-30"),
      },
    ],
    assets: [],
  },
  {
    year: 2026,
    about: "This year we close the last seam — engineering and field on a single graph, with every RFI, change order and material movement priced to a live baseline. Eighteen years of work, one cadence.",
    achievements: [
      {
        title: "One operating model for every project, from FEED to handover.",
        category: "Next",
        date: new Date("2026-01-01"),
      },
    ],
    assets: [],
  },
];

async function main() {
  console.log("Cleaning database...");
  await prisma.achievement.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.year.deleteMany();

  console.log("Seeding years, achievements and assets...");
  for (const data of seedData) {
    const createdYear = await prisma.year.create({
      data: {
        year: data.year,
        about: data.about,
      },
    });

    for (const achievement of data.achievements) {
      await prisma.achievement.create({
        data: {
          title: achievement.title,
          category: achievement.category,
          date: achievement.date,
          yearId: createdYear.id,
        },
      });
    }

    for (const asset of data.assets) {
      await prisma.asset.create({
        data: {
          url: asset.url,
          caption: asset.caption,
          month: asset.month,
          yearId: createdYear.id,
        },
      });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
