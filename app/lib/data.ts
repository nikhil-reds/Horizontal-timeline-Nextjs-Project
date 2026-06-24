export interface Year {
  id: number;
  year: number;
  about: string | null;
}

export interface Achievement {
  id: number;
  title: string;
  category: string;
  date: string;
  yearId: number;
}

export interface Asset {
  id: number;
  url: string;
  caption: string | null;
  month: number;
  yearId: number;
}

export const years: Year[] = [
  {
    id: 1,
    year: 2008,
    about: "Four engineers, one spreadsheet, and a refinery turnaround that nobody else wanted. Foundry began as a service contract — keep the schedule honest, keep the procurement log clean, keep the field reporting up to date.",
  },
  {
    id: 2,
    year: 2011,
    about: "What started as an internal workbook for daily reports becomes Foundry's first piece of software. Three EPC contractors sign on within six months. The product roadmap is written in pencil, on the back of a P&ID.",
  },
  {
    id: 3,
    year: 2014,
    about: "The PO log lands in the same database as the field report. Project controllers stop reconciling between Primavera, Excel and email. Foundry now sits between the trailer and the home office on every project it touches.",
  },
  {
    id: 4,
    year: 2017,
    about: "The first multi-currency, multi-language deployment lands with a Dutch midstream operator. Within eighteen months Foundry runs the controls cadence on projects across nineteen countries and four continents.",
  },
  {
    id: 5,
    year: 2020,
    about: "The mobile app — quietly in development for two years — is pulled forward and shipped in eleven weeks. Superintendents file punch lists from their phones at half-capacity sites. Not a single customer cancels.",
  },
  {
    id: 6,
    year: 2022,
    about: "Variance forecasting goes live across every active baseline. Twelve years of schedule and cost history finally pay a dividend. Foundry Intelligence forecasts EVM variance four weeks out at a 86% confidence interval.",
  },
  {
    id: 7,
    year: 2024,
    about: "Two-thirds of the Engineering News-Record Top 100 sit on the platform. The blueprint view — the one drawn on a whiteboard in 2009 — quietly becomes the way most of the industry plans a turnaround.",
  },
  {
    id: 8,
    year: 2026,
    about: "This year we close the last seam — engineering and field on a single graph, with every RFI, change order and material movement priced to a live baseline. Eighteen years of work, one cadence.",
  },
];

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "A controls team forms in a portable trailer outside Baytown.",
    category: "Origin",
    date: "2008-05-15T00:00:00.000Z",
    yearId: 1,
  },
  {
    id: 2,
    title: "Field Log ships — the spreadsheet finally leaves the trailer.",
    category: "Product",
    date: "2011-09-10T00:00:00.000Z",
    yearId: 2,
  },
  {
    id: 3,
    title: "Procurement and Schedule launch. One platform, three desks.",
    category: "Expansion",
    date: "2014-04-18T00:00:00.000Z",
    yearId: 3,
  },
  {
    id: 4,
    title: "Rotterdam and Singapore come online — coverage follows the shipping lanes.",
    category: "Scale",
    date: "2017-10-05T00:00:00.000Z",
    yearId: 4,
  },
  {
    id: 5,
    title: "Site offices empty. Foundry Field carries the load.",
    category: "Resilience",
    date: "2020-06-20T00:00:00.000Z",
    yearId: 5,
  },
  {
    id: 6,
    title: "Variance forecasting goes live across every active baseline.",
    category: "Intelligence",
    date: "2022-11-12T00:00:00.000Z",
    yearId: 6,
  },
  {
    id: 7,
    title: "$200B of capital projects now run through Foundry.",
    category: "Milestone",
    date: "2024-03-30T00:00:00.000Z",
    yearId: 7,
  },
  {
    id: 8,
    title: "One operating model for every project, from FEED to handover.",
    category: "Next",
    date: "2026-01-01T00:00:00.000Z",
    yearId: 8,
  },
];

export const assets: Asset[] = [
  {
    id: 1,
    url: "/extracted_ui/uploads/Screenshot 2026-05-25 at 12.59.32 PM.png",
    caption: "Team trailer outside Baytown refinery turnaround",
    month: 5,
    yearId: 1,
  },
];
