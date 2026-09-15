// Edit this file any time to add units, change prices, or update Google Doc links.
// Prices are in KES (whole numbers — Paystack KES amounts are in the base unit, not kobo).
// Units are grouped by module — each module gets its own section on the homepage.

export type Unit = {
  id: string;
  title: string;
  blurb: string;
  marks: string;
  price: number;
  docLink?: string;
  notesLink?: string;
  qnaLink?: string;
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
  {
    id: "module-3",
    title: "Module 3",
    units: [
      {
        id: "m3-unit-1",
        title: "Apply Algebra and Geometry",
        blurb: "Revision notes + Q&A pack (20 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1irpEH3XJeqIp-4t8pVEEDWgedawOI-nK/view",
        qnaLink: "https://docs.google.com/document/d/1jUN2b6GTJeJ8dSdnruhKJ-962eMeyAkh/view",
      },
      {
        id: "m3-unit-2",
        title: "Apply Entrepreneurial Skills",
        blurb: "Revision notes + Q&A pack (20 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1vFu4rnEFlsBhis-I__wNobkH_FqtvIE3/view",
        qnaLink: "https://docs.google.com/document/d/1BT_IRzBXm1L1pBbtYz3ymHrTF2MsZ3z_/view",
      },
      {
        id: "m3-unit-3",
        title: "Apply Structural Analysis Principles I",
        blurb: "Revision notes + Q&A pack (20 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1uv_B-U-8NHpQeGsw18K_fEDBxoQoSUeR/view",
        qnaLink: "https://docs.google.com/document/d/1VJ-6tzb-IQ78rgRt3ZK_bR1HVvusaKXT/view",
      },
      {
        id: "m3-unit-4",
        title: "Carry Out Engineering Survey I",
        blurb: "Revision notes + Q&A pack (20 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1gAhW3vDqoI25IuTGDcqKsoeUyJn2alJL/view",
        qnaLink: "https://docs.google.com/document/d/1h3aOF63PDehe24TjMCdvg75m_AP35Q17/view",
      },
      {
        id: "m3-unit-5",
        title: "Carry Out Road Construction Works II",
        blurb: "Revision notes + Q&A pack (20 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1xlzyibReMQH95ug0BqjduYUA1P8yDuOO/view",
        qnaLink: "https://docs.google.com/document/d/1yYOpy-jsymryCEI6kI-OedvHophMydLH/view",
      },
      {
        id: "m3-unit-6",
        title: "Conduct Material Testing I",
        blurb: "Revision notes + Q&A pack (20 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/14AVhnz3sHUJ7L4x9qJ0XOzPFhehHu2Ik/view",
        qnaLink: "https://docs.google.com/document/d/1Qif_fk8PmAfdo9Q75KxqUyIV1MPZQhir/view",
      },
    ],
    bundle: {
      id: "module-3-bundle",
      title: "All 6 Units — Module 3 Full Bundle",
      blurb: "Every unit in Module 3, one purchase.",
      price: 250,
    },
  },
  {
    id: "module-4",
    title: "Module 4",
    units: [
      {
        id: "m4-unit-1",
        title: "Apply Measurements Estimation and Costing Principles I",
        blurb: "In-depth revision notes + Q&A pack (30 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/15DF6Hy3JmPCE16aXcgYK42hUWQ5U_r9k/view",
        qnaLink: "https://docs.google.com/document/d/1LhCl0xN3hmbnHMC5R2-gf00UB1a12Ufn/view",
      },
      {
        id: "m4-unit-2",
        title: "Apply Structural Analysis Principles II",
        blurb: "In-depth revision notes + Q&A pack (30 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1njOJe4QneKQplH9fDEBbvSpwejt8OlMN/view",
        qnaLink: "https://docs.google.com/document/d/1LiZ-5Om9Q3Gz69xB1TlkQc50GR8AmiU5/view",
      },
      {
        id: "m4-unit-3",
        title: "Apply Trigonometry and Complex Numbers",
        blurb: "In-depth revision notes + Q&A pack (30 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1ABydOPeaIglDWPUjS0TEzdXkicAS6Dz1/view",
        qnaLink: "https://docs.google.com/document/d/1qStWnwN80Yzq7zg0gdIlPVRno2RaZL0H/view",
      },
      {
        id: "m4-unit-4",
        title: "Carry Out Civil Engineering Works II",
        blurb: "In-depth revision notes + Q&A pack (30 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/18OuyDgGEajx4YWIZCCTKBy4RHuKygArd/view",
        qnaLink: "https://docs.google.com/document/d/1muzCXSG4EA8_4aEFYrL2Z64MI6e19AwP/view",
      },
      {
        id: "m4-unit-5",
        title: "Carry Out Engineering Survey II",
        blurb: "In-depth revision notes + Q&A pack (30 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1EwWPERFz8Wc10KhA34LNf5-eNsSecxty/view",
        qnaLink: "https://docs.google.com/document/d/1p3pXcMt5ttoQZw8Vhz3C18B4MG8WdLE7/view",
      },
      {
        id: "m4-unit-6",
        title: "Design Road Structures I",
        blurb: "In-depth revision notes + Q&A pack (30 CAT-style questions).",
        marks: "Notes + Q&A",
        price: 40,
        notesLink: "https://docs.google.com/document/d/1sjC6MHursm34QfY9-mNZkdGXrkFmFu2o/view",
        qnaLink: "https://docs.google.com/document/d/1EudBDxyY2fBJG3HOKx5kdxsAsx87GQrh/view",
      },
    ],
    bundle: {
      id: "module-4-bundle",
      title: "All 6 Units — Module 4 Full Bundle",
      blurb: "Every unit in Module 4, one purchase.",
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