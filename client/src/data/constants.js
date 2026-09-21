export const PROFILE = {
  name: "Shivam Sagar",
  firstName: "Shivam",
  lastName: "Sagar",
  title: "Full Stack Developer | Backend & AI Engineering",
  email: "shivamsagar372004@gmail.com",
  phone: "+91-8102258822",
  linkedin: "https://linkedin.com/in/shivam-sagar-14241028a",
  github: "https://github.com/Shivam6050",
  location: "India",
  summary:
    "Computer Science Engineering undergraduate and Full Stack Developer with hands-on experience building production-oriented applications using React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, and TypeScript. Experienced in REST API development, authentication, database design, cloud deployment, testing, CI/CD, and backend architecture. Additional Backend AI Engineering experience includes integrating multiple third-party LLM APIs, usage metering, billing, AI workflows, retrieval-augmented workflows, and evaluation/testing for production AI systems."
};

export const PROJECTS = [
  {
    slug: "llm-usage-metering-billing-service",
    title: "LLM Usage Metering & Billing Service",
    tag: "FLAGSHIP",
    summary: "A production-oriented backend and dashboard for measuring LLM consumption and turning usage into reliable billing signals.",
    detail: "Full-stack dashboard aggregating real-time LLM token consumption, automated token-exhaustion notifications, usage metering, threshold-based alerting and a usage-based billing workflow.",
    stack: [
      { name: "react", label: "React" }, { name: "typescript", label: "TypeScript" },
      { name: "nodedotjs", label: "Node.js" }, { name: "express", label: "Express" },
      { name: "prisma", label: "Prisma" }, { name: "postgresql", label: "PostgreSQL" }
    ],
    demo: "",
    code: "https://github.com/Shivam6050/Backend-capstone-llm-metering",
    pattern: "pattern-1",
    thumbLabel: "metering.service",
    thumbSub: "tokens → $$",
    order: 1
  },
  {
    slug: "learning-map-builder",
    title: "Learning Map Builder",
    tag: "AI",
    summary: "An AI-assisted learning path builder that turns goals and resources into structured, personalized maps.",
    detail: "Multi-stage AI pipeline using Gemini and YouTube with server-side URL validation, Supabase PostgreSQL RLS, Vitest coverage, GitHub Actions and daily dead-link detection.",
    stack: [
      { name: "nextjs", label: "Next.js" }, { name: "typescript", label: "TypeScript" },
      { name: "supabase", label: "Supabase" }, { name: "googlegemini", label: "Gemini API" },
      { name: "youtube", label: "YouTube API" }, { name: "vitest", label: "Vitest" }
    ],
    demo: "",
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
    summary: "A full-stack commerce platform with authentication, catalog, cart, orders and an administration surface.",
    detail: "MERN e-commerce application with RESTful APIs, reusable React interfaces, scalable backend architecture and a foundation for payment gateway integration.",
    stack: [
      { name: "react", label: "React" }, { name: "nodedotjs", label: "Node.js" },
      { name: "express", label: "Express" }, { name: "mongodb", label: "MongoDB" }
    ],
    demo: "",
    code: "https://github.com/Shivam6050/ecommerce-project",
    pattern: "pattern-3",
    thumbLabel: "shop.platform",
    thumbSub: "cart → order",
    order: 3
  }
];

export const STACK_GROUPS = [
  {
    title: "Languages",
    items: [["javascript", "JavaScript"], ["typescript", "TypeScript"], ["cplusplus", "C++"], ["html5", "HTML5"], ["css3", "CSS3"]]
  },
  {
    title: "Frontend",
    items: [["react", "React.js"], ["nextjs", "Next.js"], ["tailwind", "Tailwind"]]
  },
  {
    title: "Backend",
    items: [["nodedotjs", "Node.js"], ["express", "Express"], ["postgresql", "PostgreSQL"], ["mongodb", "MongoDB"], ["prisma", "Prisma"], ["supabase", "Supabase"]]
  },
  {
    title: "AI / LLM",
    items: [["googlegemini", "Gemini API"], ["anthropic", "Anthropic"], ["openai", "OpenAI"]]
  },
  {
    title: "Testing",
    items: [["vitest", "Vitest"], ["postman", "Postman"]]
  },
  {
    title: "DevOps & Tools",
    items: [["git", "Git"], ["github", "GitHub"], ["githubactions", "GitHub Actions"], ["vercel", "Vercel"], ["netlify", "Netlify"], ["vscode", "VS Code"]]
  }
];

const icon = (name, color) => `https://cdn.simpleicons.io/${name}/${color}`;

export const LOGOS = {
  javascript: icon("javascript", "F7DF1E"), typescript: icon("typescript", "3178C6"), cplusplus: icon("cplusplus", "00599C"),
  html5: icon("html5", "E34F26"), css3: icon("css3", "1572B6"), react: icon("react", "61DAFB"), nextjs: icon("nextdotjs", "000000"),
  tailwind: icon("tailwindcss", "06B6D4"), nodedotjs: icon("nodedotjs", "339933"), express: icon("express", "000000"),
  mongodb: icon("mongodb", "47A248"), postgresql: icon("postgresql", "4169E1"), supabase: icon("supabase", "3ECF8E"),
  prisma: icon("prisma", "2D3748"), googlegemini: icon("googlegemini", "8E75E2"), anthropic: icon("anthropic", "000000"),
  openai: icon("openai", "412991"), git: icon("git", "F05032"), github: icon("github", "181717"),
  githubactions: icon("githubactions", "2088FF"), vscode: icon("visualstudiocode", "007ACC"), vercel: icon("vercel", "000000"),
  netlify: icon("netlify", "00C7B7"), postman: icon("postman", "FF6C37"), vitest: icon("vitest", "6E9F18"),
  google: icon("google", "4285F4"), youtube: icon("youtube", "FF0000"), linkedin: icon("linkedin", "0A66C2")
};
