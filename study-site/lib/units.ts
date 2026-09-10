// Edit this file any time to add units, change prices, or update Google Doc links.
// Prices are in KES (whole numbers — Paystack KES amounts are in the base unit, not kobo).
// Units are grouped by module — each module gets its own section on the homepage.

export type Unit = {
  id: string;
  title: string;
  blurb: string;
  marks: string; // e.g. "10-mark CAT style"
  price: number; // KES
  docLink: string; // Google Doc (view-only) link
};

export type ModuleBundle = {
  id: string;
  title: string;
  blurb: string;
  price: number; // KES
};

export type Module = {
  id: string;
  title: string;
  units: Unit[];
  bundle: ModuleBundle;
};

export const modules: Module[] = [
  {
    id: "module-1",
    title: "Module 1",
    units: [
      {
        id: "m1-unit-1",
        title: "Apply Communication Skills",
        blurb: "Revision notes + Q&A pack, with video links on tricky topics.",
        marks: "Notes + Q&A",
        price: 40,
        docLink: "https://docs.google.com/document/d/1076LQMbxUj3k1mDQZzGTglZaULuB8NyC/view",
      },
      {
        id: "m1-unit-2",
        title: "Apply Construction Materials Science I",
        blurb: "Revision notes + Q&A pack.",
        marks: "Notes + Q&A",
        price: 40,
        docLink: "https://docs.google.com/document/d/1hcNIuSmF-0tr8hChZ2NLs6FW47xjSlRv/view",
      },
      {
        id: "m1-unit-3",
        title: "Apply Digital Literacy",
        blurb: "Revision notes + Q&A pack.",
        marks: "Notes + Q&A",
        price: 40,
        docLink: "https://docs.google.com/document/d/1OXOO6F2kE5D5U85xPTx-dwQg56nDWZm5/view",
      },
      {
        id: "m1-unit-4",
        title: "Apply Work Ethics and Practices",
        blurb: "Revision notes + Q&A pack.",
        marks: "Notes + Q&A",
        price: 40,
        docLink: "https://docs.google.com/document/d/1BrR2e_6bsCf6BJHRvTKkK-Q_I0n5pEjh/view",
      },
      {
        id: "m1-unit-5",
        title: "Carry Out Civil Engineering Works I",
        blurb: "Revision notes + Q&A pack.",
        marks: "Notes + Q&A",
        price: 40,
        docLink: "https://docs.google.com/document/d/1BLFRrNSs4cqVIpyCt-eX3IojhBA1-eHT/view",
      },
      {
        id: "m1-unit-6",
        title: "Carry Out Site Survey",
        blurb: "Revision notes + Q&A pack.",
        marks: "Notes + Q&A",
        price: 40,
        docLink: "https://docs.google.com/document/d/1uaDwINWTn7CI3T-q-q8tWoS0etK2DGxW/view",
      },
    ],
    bundle: {
      id: "module-1-bundle",
      title: "All 6 Units — Module 1 Full Bundle",
      blurb: "Every unit in Module 1, one purchase.",
      price: 220,
    },
  },
  {
    id: "module-2",
    title: "Module 2",
    units: [
      {
        id: "unit-1",
        title: "Workshop Technology",
        blurb: "Conversational Q&A covering foundational concepts.",
        marks: "Concept review",
        price: 40,
        docLink: "https://docs.google.com/document/d/1Jvxtn1IG_0k40MVRi5jbnjCTBiOWLOuj/view",
      },
      {
        id: "unit-2",
        title: "Apply Mathematical Principles",
        blurb: "Calculation-first, scenario-based worked examples.",
        marks: "10-mark CAT style",
        price: 40,
        docLink: "https://docs.google.com/document/d/1qZ_JYgGdmuo6xF-xgr_n9XsoH0DCHoNV/view",
      },
      {
        id: "unit-3",
        title: "Apply Construction Material Science 2",
        blurb: "Blended conceptual + calculation questions.",
        marks: "10-mark CAT style",
        price: 40,
        docLink: "https://docs.google.com/document/d/1Su1jsL3Xt979J0BbQZUyGgStbin-7cl9/view",
      },
      {
        id: "unit-4",
        title: "Prepare Technical Drawing",
        blurb: "Blended conceptual + calculation questions.",
        marks: "10-mark CAT style",
        price: 40,
        docLink: "https://docs.google.com/document/d/1BcjODgDiTajuuR_Lvglf6inRh8avndGs/view",
      },
      {
        id: "unit-5",
        title: "Prepare For Material Testing",
        blurb: "Full unit Q&A pack.",
        marks: "10-mark CAT style",
        price: 40,
        docLink: "https://docs.google.com/document/d/19UmSCuNT6xIgZFAwldSaDe56coa2pfcr/view",
      },
      {
        id: "unit-6",
        title: "Road Construction Works 1",
        blurb: "Full unit Q&A pack.",
        marks: "10-mark CAT style",
        price: 40,
        docLink: "https://docs.google.com/document/d/1oAOqPuTYHpK1KmMEO5XE6rauzFsWIKbq/view",
      },
    ],
    bundle: {
      id: "full-bundle",
      title: "All 6 Units — Full Bundle",
      blurb: "Every unit in Module 2, one purchase.",
      price: 250,
    },
  },
];

export function findProduct(id: string) {
  for (const mod of modules) {
    if (mod.bundle.id === id) return mod.bundle;
    const unit = mod.units.find((u) => u.id === id);
    if (unit) return unit;
  }
  return undefined;
}
