export const siteConfig = {
  name: "Sumanraj Medikondu",
  displayName: "Sumanraj.Medikondu",
  title: "Sumanraj Medikondu — Operations & Supply Chain Leader",
  description:
    "Senior operations and supply chain professional with deep expertise in logistics optimization, vendor management, and business process transformation across pharmaceutical, e-commerce, and global freight industries.",
  url: "https://sumanrajmedikondu.com",
  email: "sumanraj.medikondu@email.com",
  linkedin: "https://linkedin.com/in/sumanrajmedikondu",
};

export const images = {
  hero: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&w=1920&q=80&fit=crop",
  philosophy: "https://images.unsplash.com/photo-1553413077-190dd305871c?fm=jpg&w=1920&q=80&fit=crop",
  supplyChain: "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?fm=jpg&w=1920&q=80&fit=crop",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fm=jpg&w=1920&q=80&fit=crop",
  planning: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=jpg&w=1920&q=80&fit=crop",
  strategy: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&w=1920&q=80&fit=crop",
  contact: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fm=jpg&w=1920&q=80&fit=crop",
};

export const hero = {
  greeting: "Operations & Supply Chain Leadership",
  firstName: "Sumanraj.",
  lastName: "Medikondu",
  title: "Operations & Supply Chain Leader",
  subtitle:
    "I transform complex supply chains into competitive advantages — driving efficiency, reducing costs, and building resilient operations across global markets.",
  cta: "Explore the work",
  ctaSecondary: "Get in touch",
};

export const intro = {
  statement:
    "Great operations are invisible. Shipments arrive, shelves stay full, numbers reconcile — and nobody has to ask why. That quiet reliability is the product of systems built with intent.",
  stats: [
    { value: "10+", label: "Years of experience" },
    { value: "4", label: "Industries served" },
    { value: "50+", label: "Vendor partnerships" },
    { value: "30%", label: "Avg. cost reduction" },
  ],
};

export interface StoryKpi {
  value: string;
  label: string;
}

export interface StoryLayer {
  name: string;
  desc: string;
}

export const chapters = {
  supplyChain: {
    eyebrow: "Supply Chain",
    title: "Networks that never stand still.",
    description:
      "Ten years connecting suppliers, carriers, hubs and customers into systems that move as one — from India's freight corridors to U.S. pharmaceutical operations.",
    skills: [
      "Freight Forwarding",
      "Carrier Management",
      "Route Optimization",
      "3PL Contracts",
      "Warehouse Operations",
    ],
    kpis: [
      { value: "30+", label: "Carrier partnerships" },
      { value: "20%", label: "Faster transit times" },
      { value: "4", label: "Industries served" },
    ] as StoryKpi[],
  },
  analytics: {
    eyebrow: "Analytics",
    title: "Operations, measured to the decimal.",
    description:
      "Vendor scorecards, audit trails, cost curves — every workflow instrumented, every decision defended by data.",
    skills: [
      "Vendor Performance",
      "Cost Optimization",
      "Third-Party Audits",
      "Quality Assurance",
    ],
    kpis: [
      { value: "96.4%", label: "On-time delivery" },
      { value: "-12.3%", label: "Cost variance" },
      { value: "4.8", label: "Vendor score avg." },
      { value: "100%", label: "Audit findings closed" },
    ] as StoryKpi[],
  },
  planning: {
    eyebrow: "Planning",
    title: "Where forecasts meet reality.",
    description:
      "Demand planning and S&OP discipline that pull projection and outcome onto the same line — quarter after quarter.",
    skills: [
      "Demand Planning",
      "S&OP",
      "Inventory Strategy",
      "Procurement Planning",
    ],
    highlights: [
      { metric: "98%", label: "Forecast accuracy" },
      { metric: "Q/Q", label: "Variance improvement" },
      { metric: "4", label: "Planning cycles led" },
    ],
  },
  strategy: {
    eyebrow: "Strategy",
    title: "Decisions, built in layers.",
    description:
      "From raw signal to executed outcome — a repeatable operating system for decisions that scale across teams and geographies.",
    skills: [
      "Cross-functional Leadership",
      "Change Management",
      "Stakeholder Alignment",
      "HR Operations",
    ],
    layers: [
      {
        name: "Data",
        desc: "Signals collected from every node of the operation — shipments, costs, vendors, people.",
      },
      {
        name: "Insight",
        desc: "Patterns separated from noise; the few numbers that actually move the business.",
      },
      {
        name: "Decision",
        desc: "Clear calls with owners, deadlines and thresholds — made once, made well.",
      },
      {
        name: "Execution",
        desc: "Teams aligned on the critical path, with feedback loops that catch drift early.",
      },
      {
        name: "Outcome",
        desc: "Compounding operational advantage — measured, audited, repeatable.",
      },
    ] as StoryLayer[],
  },
};

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    role: "Operations Strategy Analyst & HR Manager",
    company: "Falmouth Pharma",
    location: "United States",
    period: "2022 — Present",
    description:
      "Leading cross-functional operations strategy and human resources initiatives within a fast-paced pharmaceutical environment.",
    highlights: [
      "Designed and implemented operational workflow optimizations that improved team productivity by 25%",
      "Spearheaded vendor performance measurement programs with continuous improvement frameworks",
      "Led third-party audit processes and remediation efforts ensuring full regulatory compliance",
      "Managed end-to-end HR operations including talent acquisition, onboarding, and performance management",
    ],
  },
  {
    role: "Manager, Logistics",
    company: "AWOT Global Logistics (India) Pvt. Ltd.",
    location: "India",
    period: "2019 — 2022",
    description:
      "Directed domestic logistics operations, carrier negotiations, and procurement strategy for a leading freight forwarding company.",
    highlights: [
      "Managed procurement of competitive pricing from vendors and carriers across domestic routes",
      "Prepared and delivered comprehensive quotation packages for enterprise clients",
      "Streamlined domestic operations reducing transit times by 20% through route optimization",
      "Built and maintained a network of 30+ carrier partnerships ensuring service reliability",
    ],
  },
  {
    role: "Logistics Assistant & Operations Manager",
    company: "Dimerco Express (India) Pvt. Ltd.",
    location: "India",
    period: "2016 — 2019",
    description:
      "Managed procurement, supply chain coordination, and process improvement for an international freight and logistics firm.",
    highlights: [
      "Orchestrated communication between project managers and procurement teams for seamless execution",
      "Introduced process improvements in supply chain workflows reducing errors by 35%",
      "Managed strategic vendor and supplier relationships across multiple geographies",
      "Coordinated cross-functional teams to deliver complex logistics projects on time and within budget",
    ],
  },
  {
    role: "Supervisor, Operations",
    company: "AskmeBazaar",
    location: "India",
    period: "2014 — 2016",
    description:
      "Built e-commerce fulfillment infrastructure from the ground up during a period of rapid company growth.",
    highlights: [
      "Set up e-commerce business modules and fulfillment workflows for a high-growth marketplace",
      "Developed and operationalized warehouse facilities to support scaling order volumes",
      "Negotiated and executed contracts with 3PL providers optimizing cost and service levels",
      "Established inventory management systems and quality control processes",
    ],
  },
];

export const education = [
  {
    degree: "Master of Business Administration",
    field: "Operations & Supply Chain Management",
    institution: "University Name",
    year: "2014",
    note: "[Update with actual institution]",
  },
  {
    degree: "Bachelor's Degree",
    field: "Business Administration",
    institution: "University Name",
    year: "2012",
    note: "[Update with actual institution]",
  },
];

export const testimonials = [
  {
    quote:
      "Sumanraj has an exceptional ability to see the big picture while managing the smallest operational details. His work on our supply chain transformation delivered results that exceeded every benchmark.",
    name: "Senior Director",
    role: "Global Logistics Company",
    note: "[Placeholder — replace with real testimonial]",
  },
  {
    quote:
      "Working with Sumanraj transformed how we think about vendor management. He doesn't just negotiate better rates — he builds partnerships that create lasting value.",
    name: "VP of Operations",
    role: "Pharmaceutical Company",
    note: "[Placeholder — replace with real testimonial]",
  },
  {
    quote:
      "Sumanraj built our warehouse operations from scratch during our most critical growth phase. His calm leadership and systematic approach were exactly what we needed.",
    name: "Co-Founder",
    role: "E-commerce Startup",
    note: "[Placeholder — replace with real testimonial]",
  },
];
