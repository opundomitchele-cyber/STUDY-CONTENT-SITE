// Edit this file any time to add units, change prices, or update Google Doc links.
// Prices are in KES (whole numbers — Paystack KES amounts are in the base unit, not kobo).

export type Unit = {
  id: string;
  title: string;
  blurb: string;
  marks: string; // e.g. "10-mark CAT style"
  price: number; // KES
  docLink: string; // Google Doc (view-only) link — REPLACE with your real links
};

export const units: Unit[] = [
  {
    id: "unit-1",
    title: "Workshop Technology",
    blurb: "Conversational Q&A covering foundational concepts.",
    marks: "Concept review",
    price: 40,
    docLink: "https://docs.google.com/document/d/1Jvxtn1IG_0k40MVRi5jbnjCTBiOWLOuj/edit?usp=sharing&ouid=107384047421044338728&rtpof=true&sd=true",
  },
  {
    id: "unit-2",
    title: "Apply Mathematical Principles",
    blurb: "Calculation-first, scenario-based worked examples.",
    marks: "10-mark CAT style",
    price: 40,
    docLink: "https://docs.google.com/document/d/1qZ_JYgGdmuo6xF-xgr_n9XsoH0DCHoNV/edit?usp=sharing&ouid=107384047421044338728&rtpof=true&sd=true",
  },
  {
    id: "unit-3",
    title: "Apply Construction Material Science 2",
    blurb: "Blended conceptual + calculation questions.",
    marks: "10-mark CAT style",
    price: 40,
    docLink: "https://docs.google.com/document/d/1Su1jsL3Xt979J0BbQZUyGgStbin-7cl9/edit?usp=sharing&ouid=107384047421044338728&rtpof=true&sd=true",
  },
  {
    id: "unit-4",
    title: "Prepare Technical Drawing",
    blurb: "Blended conceptual + calculation questions.",
    marks: "10-mark CAT style",
    price: 40,
    docLink: "https://docs.google.com/document/d/1BcjODgDiTajuuR_Lvglf6inRh8avndGs/edit?usp=sharing&ouid=107384047421044338728&rtpof=true&sd=true",
  },
  {
    id: "unit-5",
    title: "Prepare For Material Testing",
    blurb: "Full unit Q&A pack.",
    marks: "10-mark CAT style",
    price: 40,
    docLink: "https://docs.google.com/document/d/19UmSCuNT6xIgZFAwldSaDe56coa2pfcr/edit?usp=sharing&ouid=107384047421044338728&rtpof=true&sd=true",
  },
  {
    id: "unit-6",
    title: "Road Construction Works 1",
    blurb: "Full unit Q&A pack.",
    marks: "10-mark CAT style",
    price: 40,
    docLink: "https://docs.google.com/document/d/1oAOqPuTYHpK1KmMEO5XE6rauzFsWIKbq/edit?usp=sharing&ouid=107384047421044338728&rtpof=true&sd=true",
  },
];

export const bundle = {
  id: "full-bundle",
  title: "All 6 Units — Full Bundle",
  blurb: "Every unit in Module 2, one purchase.",
  price: 250, // adjust — currently ~17% off buying all 6 separately
};

export function findProduct(id: string) {
  if (id === bundle.id) return bundle;
  return units.find((u) => u.id === id);}