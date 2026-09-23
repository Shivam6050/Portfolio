// Shared portfolio project data.
// Keep project content here so the client, API seed, and database use one source of truth.

export const PROJECTS = [
  {
    slug: "llm-usage-metering-billing-service",
    title: "LLM Usage Metering & Billing Service",
    tag: "FLAGSHIP",
    summary: "A full-stack dashboard that aggregates real-time consumption data across multiple third-party LLM provider APIs into a unified interface.",
    detail: "Built automated token-allocation alerts and centralized usage-based billing with a type-safe Node.js/Express/Prisma backend, PostgreSQL, and a React/TypeScript frontend.",
    stack: [
      { name: "react", label: "React" }, { name: "typescript", label: "TypeScript" },
      { name: "nodedotjs", label: "Node.js" }, { name: "express", label: "Express" },
      { name: "prisma", label: "Prisma" }, { name: "postgresql", label: "PostgreSQL" }
    ],
    demo: "https://backend-capstone-llm-metering-pied.vercel.app",
    preview: "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://backend-capstone-llm-metering-pied.vercel.app",
    code: "https://github.com/Shivam6050/Backend-capstone-llm-metering",
    pattern: "pattern-1",
    thumbLabel: "metering.service",
    thumbSub: "tokens → billing",
    order: 1
  },
  {
    slug: "learning-map-builder",
    title: "Learning Map Builder",
    tag: "AI",
    summary: "A multi-stage AI pipeline that creates personalized, budget-aware learning paths from goals and resources.",
    detail: "Uses Gemini API and YouTube Data API with server-side URL validation, Supabase PostgreSQL row-level security, per-user AI rate limiting, GitHub Actions CI/CD, Vitest, Google OAuth, and automated dead-link detection.",
    stack: [
      { name: "nextjs", label: "Next.js" }, { name: "typescript", label: "TypeScript" },
      { name: "supabase", label: "Supabase" }, { name: "googlegemini", label: "Gemini API" },
      { name: "youtube", label: "YouTube API" }, { name: "vitest", label: "Vitest" }
    ],
    demo: "https://learning-map-provider-bice.vercel.app",
    preview: "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://learning-map-provider-bice.vercel.app",
    code: "https://github.com/Shivam6050/learning-map-provider",
    pattern: "pattern-2",
    thumbLabel: "learning.map",
    thumbSub: "gemini + yt",
    order: 2
  },
  {
    slug: "e-commerce-web-application",
    title: "E-Commerce Web Application",
    tag: "FULL-STACK",
    summary: "A full-stack e-commerce platform with user authentication, product catalog management, shopping cart, and order-processing workflows.",
    detail: "Built RESTful APIs with MongoDB, a dedicated admin dashboard for product and inventory operations, and a responsive customer interface with a scalable backend architecture.",
    stack: [
      { name: "react", label: "React" }, { name: "nodedotjs", label: "Node.js" },
      { name: "express", label: "Express" }, { name: "mongodb", label: "MongoDB" }
    ],
    demo: "https://ecommerce-project-frontend-two.vercel.app",
    previews: [
      "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://ecommerce-project-frontend-two.vercel.app/",
      "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://ecommerce-project-frontend-two.vercel.app/cart",
      "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://ecommerce-project-frontend-two.vercel.app/place-order"
    ],
    code: "https://github.com/Shivam6050/ecommerce-project",
    pattern: "pattern-3",
    thumbLabel: "shop.platform",
    thumbSub: "cart → order",
    order: 3
  }
];
