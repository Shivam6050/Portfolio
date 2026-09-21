import { PROFILE_PHOTO } from "./profilePhoto.js";

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
  photo: PROFILE_PHOTO,
  summary:
    "Computer Science Engineering undergraduate and Full Stack Developer with hands-on experience building production-oriented applications using React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, and TypeScript. Experienced in REST API development, authentication, database design, cloud deployment, testing, CI/CD, and backend architecture. Additional Backend AI Engineering experience includes integrating multiple third-party LLM APIs, usage metering, billing, AI workflows, retrieval-augmented workflows, and evaluation/testing for production AI systems.",
  education: [
    {
      institution: "Arya College of Engineering",
      logo: "arya-college",
      period: "Aug. 2023 – May 2027",
      degree: "Bachelor of Technology in Computer Science Engineering",
      result: "CGPA: 7.5/10"
    },
    {
      institution: "Sainik School, Bhubaneswar",
      logo: "sainik-school",
      period: "",
      degree: "Intermediate (Class XII)",
      result: "71%"
    },
    {
      institution: "Sainik School, Bhubaneswar",
      period: "",
      degree: "Matriculation (Class X)",
      result: "83.8%"
    }
  ],
  experience: [
    {
      company: "FlyRank AI",
      logo: "flyrank",
      period: "Jul. 2026 – Sep. 2026",
      role: "Backend AI Engineering Intern",
      stack: [["nodedotjs", "Node.js"], ["express", "Express.js"], ["typescript", "TypeScript"], ["prisma", "Prisma"], ["rest", "REST APIs"]],
      points: [
        "Designed and built a backend service for LLM API usage metering and billing, integrating multiple third-party LLM providers into a unified RESTful system.",
        "Implemented real-time usage tracking, threshold-based alerting, and usage-based billing workflows using Node.js, Express.js, TypeScript, and Prisma ORM.",
        "Worked on API contract design, backend architecture, retrieval-augmented workflows, evaluation, and testing for production-oriented AI systems.",
        "Completed 17 technical assignments across backend engineering and AI engineering, with 156+ verified hours across assignments, capstone delivery, and technical coursework."
      ]
    },
    {
      company: "GeeksforGeeks",
      logo: "geeksforgeeks",
      period: "Jun. 2025 – Oct. 2025",
      role: "MERN Stack Developer Intern",
      stack: [["mongodb", "MongoDB"], ["express", "Express.js"], ["react", "React.js"], ["nodedotjs", "Node.js"]],
      points: [
        "Built and maintained full-stack web applications end to end using the MERN stack.",
        "Designed and implemented RESTful APIs for user authentication, data handling, and dynamic content delivery.",
        "Built reusable, responsive React components and optimized database queries and API response times for improved application performance.",
        "Collaborated on debugging, feature development, and version-control workflows using Git and GitHub."
      ]
    }
  ],
  certifications: [
    {
      issuer: "Anthropic",
      logo: "anthropic",
      title: "Claude & Agentic AI",
      detail: "Claude Code in Action, Claude Platform 101, Claude Code 101, Introduction to Model Context Protocol, MCP Advanced Topics, Claude Cowork, Claude 101, and AI Fluency."
    },
    {
      issuer: "Google Skills / DeepMind",
      logo: "deepmind",
      title: "AI & LLM Training",
      detail: "Skill badges covering small language models, language data, neural networks, large language models, generative AI, responsible AI, Google Cloud responsible AI, and prompt design in Agent Platform."
    }
  ],
  additionalActivities: [
    "Actively building and deploying full-stack applications to strengthen practical software-engineering experience and production readiness.",
    "Practicing Data Structures and Algorithms in C++ and exploring scalable system design and backend architecture.",
    "Building practical expertise at the intersection of full-stack development, backend engineering, and applied AI/LLM systems.",
    "Long-term goal of building and launching technology products and startups."
  ]
};

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

export const STACK_GROUPS = [
  {
    title: "Languages",
    items: [
      ["javascript", "JavaScript"], ["typescript", "TypeScript"], ["sql", "SQL"],
      ["cplusplus", "C++"], ["c", "C"], ["html5", "HTML5"], ["css3", "CSS3"]
    ]
  },
  {
    title: "Frontend",
    items: [["react", "React.js"], ["nextjs", "Next.js"], ["responsive", "Responsive Web Design"]]
  },
  {
    title: "Backend & Data",
    items: [
      ["nodedotjs", "Node.js"], ["express", "Express.js"], ["mongodb", "MongoDB"],
      ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["prisma", "Prisma ORM"]
    ]
  },
  {
    title: "AI / LLM",
    items: [
      ["googlegemini", "Gemini API"], ["anthropic", "Anthropic"], ["openai", "OpenAI"],
      ["rag", "RAG"], ["mcp", "MCP"], ["prompt", "Prompt Engineering"], ["evaluation", "AI Evaluation"]
    ]
  },
  {
    title: "Security & Engineering",
    items: [
      ["auth", "Authentication"], ["authorization", "Authorization"], ["oauth", "Google OAuth"],
      ["security", "Row-Level Security"], ["ratelimit", "Rate Limiting"], ["system", "System Design"], ["dsa", "DSA"]
    ]
  },
  {
    title: "Tools & Delivery",
    items: [
      ["git", "Git"], ["github", "GitHub"], ["githubactions", "GitHub Actions"],
      ["vercel", "Vercel"], ["netlify", "Netlify"], ["postman", "Postman"], ["vscode", "VS Code"], ["vitest", "Vitest"]
    ]
  }
];

const icon = (name, color) => "https://cdn.simpleicons.org/" + name + "/" + color;

export const LOGOS = {
  javascript: icon("javascript", "F7DF1E"), typescript: icon("typescript", "3178C6"), sql: icon("postgresql", "4169E1"),
  cplusplus: icon("cplusplus", "00599C"), c: icon("c", "A8B9CC"), html5: icon("html5", "E34F26"), css3: icon("css3", "1572B6"),
  react: icon("react", "61DAFB"), nextjs: icon("nextdotjs", "000000"), nodedotjs: icon("nodedotjs", "339933"),
  express: icon("express", "000000"), mongodb: icon("mongodb", "47A248"), postgresql: icon("postgresql", "4169E1"),
  supabase: icon("supabase", "3ECF8E"), prisma: icon("prisma", "2D3748"), googlegemini: icon("googlegemini", "8E75E2"),
  anthropic: icon("anthropic", "000000"), openai: icon("openai", "412991"), git: icon("git", "F05032"),
  github: icon("github", "181717"), gmail: icon("gmail", "EA4335"), githubactions: icon("githubactions", "2088FF"), vscode: icon("visualstudiocode", "007ACC"),
  vercel: icon("vercel", "000000"), netlify: icon("netlify", "00C7B7"), postman: icon("postman", "FF6C37"),
  vitest: icon("vitest", "6E9F18"), youtube: icon("youtube", "FF0000"), linkedin: icon("linkedin", "0A66C2"),
  google: icon("google", "4285F4"), responsive: icon("css3", "1572B6"), rag: icon("googlegemini", "8E75E2"),
  mcp: icon("modelcontextprotocol", "000000"), prompt: icon("googlegemini", "8E75E2"), evaluation: icon("vitest", "6E9F18"),
  auth: icon("auth0", "EB5424"), authorization: icon("auth0", "EB5424"), oauth: icon("google", "4285F4"),
  security: icon("owasp", "000000"), ratelimit: icon("cloudflare", "F38020"), system: icon("diagramsdotnet", "F08705"),
  dsa: icon("cplusplus", "00599C"),
  rest: icon("postman", "FF6C37"),
  flyrank: "https://flyrank.ai/favicon.ico",
  geeksforgeeks: "https://www.geeksforgeeks.org/favicon.ico",
  deepmind: "https://deepmind.google/favicon.ico",
  "arya-college": "https://www.aryacollege.org/favicon.ico",
  "sainik-school": "https://sainikschoolbhubaneswar.edu.in/favicon.ico"
};
