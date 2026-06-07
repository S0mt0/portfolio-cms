import type { LandingContent } from "@/lib/types/content";

export const defaultLandingContent: Omit<
  LandingContent,
  "_id" | "createdAt" | "updatedAt"
> = {
  key: "landing",
  hero: {
    pageLabel: "Page 01 / working note",
    greeting: "Hi, I'm Somto",
    headline:
      "I build web products and backend systems, while growing deeper into smart contract development and security.",
    intro:
      "I build web products end to end. Lately I have been spending more time with Solidity, Foundry, and the small mistakes that make protocol logic unsafe.",
    portraitImageUrl: "/somto-portrait.jpg",
    primaryCta: {
      label: "See builds",
      href: "/builds",
    },
    secondaryCta: {
      label: "Contact",
      href: "/contact",
    },
    snapshots: [
      {
        label: "Started",
        value: "Fullstack work since 2022.",
      },
      {
        label: "Now",
        value: "Building deeper Solidity and security habits.",
      },
      {
        label: "Open to",
        value: "Product engineering, Web3 frontend, and early security-facing work.",
      },
    ],
  },
  selectedWorks: {
    eyebrow: "Selected work",
    title: "Small proof I can explain",
    linkLabel: "All builds",
    linkHref: "/builds",
    featuredIndexes: ["001", "002"],
  },
  selectedNotes: {
    eyebrow: "Selected notes",
    title: "Writing on engineering, Web3, and other fun stuff (maybe)",
    linkLabel: "All notes",
    linkHref: "/notes",
    featuredSlugs: [
      "from-fullstack-assumptions-to-protocol-assumptions",
      "what-i-check-first-in-a-small-solidity-contract",
    ],
  },
  aside: {
    studyTitle: "Current study",
    studyDescription:
      "I am treating smart contract security as practice first, proof later.",
    studyItems: [
      "Solidity fundamentals",
      "Foundry tests",
      "Access control",
      "Reentrancy",
      "Protocol assumptions",
    ],
    toolboxTitle: "Toolbox",
    skillGroups: [
      {
        title: "Build apps",
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "NestJS",
          "Express.js",
          "Prisma",
          "PostgreSQL",
          "MongoDB",
          "REST APIs",
        ],
      },
      {
        title: "Shape interfaces",
        skills: [
          "Zustand",
          "Redux Toolkit",
          "React Query",
          "React Hook Form",
          "Zod",
          "Tailwind CSS",
          "shadcn/ui",
          "Framer Motion",
        ],
      },
      {
        title: "Work with chains",
        skills: [
          "Solidity",
          "Foundry",
          "EVM",
          "ethers.js",
          "web3.js",
          "Wagmi",
          "Viem",
          "RainbowKit",
          "Hardhat",
        ],
      },
      {
        title: "Study security",
        skills: [
          "Invariant thinking",
          "Access control",
          "Reentrancy",
          "Fuzz testing",
          "Threat modeling",
          "Writeups",
        ],
      },
    ],
  },
};
