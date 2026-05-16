import { SlideProject, GridItem } from "@/types/portfolio";

export const mockProjects: SlideProject[] = [
  {
    id: "lms-enterprise",
    category: "featured",
    title: "Learning Management System",
    subtitle: "Enterprise Solutions",
    description: "Engineered a full-scale LMS optimized for regional institutional training deployment. Built a unified architecture featuring dynamic content delivery models, micro-enrollment rules, and secure analytical tracking engines.",
    tags: ["Next.js", "Node.js", "MySQL", "Tailwind CSS", "Framer Motion"],
    images: [
      "/public/asset/LMS Teacher Dashboard.png", 
      "/public/asset/LMS Teacher subject dashboard.png",
      "/public/asset/LMS Student subject dashboard.png",
      "/public/asset/exam quizes.png",
        "asset/exam quiz dashbaord.png"
    ],
    actions: [
      { label: "Explore Platform", variant: "secondary", href: "https://github.com/your-username/lms-repo" },
      { label: "Architecture", variant: "outline", href: "https://github.com/your-username/lms-repo#architecture" }
    ]
  },

  
  {
    id: "flutter-ticketing",
    category: "featured",
    title: "IT Ticketing Mobile App",
    subtitle: "Mobile Solutions",
    description: "Designed and implemented a native cross-platform incident tracking utility. Developed client portal queues, dynamic push payloads, and custom support dispatch metrics.",
    tags: ["Flutter", "Dart", "Node.js", "MongoDB"],
    images: [
      "/asset/ticketing-preview.png"
    ],
    actions: [
      { label: "View Source", variant: "secondary", href: "https://github.com/your-username/ticket-app" }
    ]
  },
  {
    id: "portfolio-v3",
    category: "featured",
    title: "Automated Bento Portfolio",
    subtitle: "Showcase Platforms",
    description: "A highly interactive, structurally balanced grid ecosystem built to aggregate live updates via API streams. Optimized for zero cumulative layout shift (CLS) and smooth client-side rendering transitions.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: [
      "/asset/portfolio-preview.png"
    ],
    actions: [
      { label: "View Source", variant: "secondary", href: "https://github.com/your-username/bento-portfolio" }
    ]
  }
];

export const gridLayoutItems: GridItem[] = [
  {
    id: "hero-profile",
    type: "hero",
    title: "Jason Adrian",
    subtitle: "Full-Stack Developer",
    description: "Building high-performance web & mobile solutions with a focus on automation.",
    gridClasses: "md:col-span-2 md:row-span-2 flex flex-col justify-center items-center p-6",
  },
  {
    id: "projects-showcase-slider",
    type: "project-slider",
    gridClasses: "md:col-span-2 md:row-span-2 p-6 md:p-8",
  },
  {
    id: "web-ecosystem",
    type: "tech-stack",
    title: "Core Ecosystem",
    subtitle: "Daily drivers & workflows",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PHP"],
    gridClasses: "md:col-span-1",
  },
  {
    id: "mobile-engineering",
    type: "mobile",
    title: "Mobile Engineering",
    subtitle: "Cross-platform development",
    tags: ["Flutter", "Dart"],
    gridClasses: "md:col-span-1",
  },
  {
    id: "ai-automation",
    type: "automation",
    title: "AI Automation & Data Pipelines",
    subtitle: "Workflows",
    description: "Building seamless operational pipelines connecting OpenAI, n8n, and Make.com to optimize lead workflows, system notifications, and automated parsing structures.",
    gridClasses: "md:col-span-2",
    actions: [
      { label: "View Pipelines", variant: "outline", href: "https://github.com/your-username/automation-workflows" }
    ]
  },
  {
    id: "base-location",
    type: "location",
    title: "Base Location",
    description: "San Pablo City, PH 🇵🇭",
    gridClasses: "md:col-span-2",
    meta: {
      label: "Schedule Zone",
      value: "GMT+8 (Night Owl)"
    }
  },
  {
    id: "collaborate-portal",
    type: "contact",
    title: "Let's Collaborate",
    description: "Open for full-stack architecture, automation setup, or core contract consultations.",
    gridClasses: "md:col-span-2",
    actions: [
      { label: "Send Message", variant: "primary", href: "mailto:your-email@example.com" }
    ]
  }
];