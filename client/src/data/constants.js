/**
 * Main content editor: PROFILE feeds biography/contact, PROJECTS the visible gallery, STACK_GROUPS toolkit, PORTFOLIO_CONFIG headings/navigation. LOGOS serves general logos; toolkitIcons.js serves original toolkit art. Server seed records are separate and do not update this page.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import PROFILE_PHOTO from ./profilePhoto.js; edit that module for the shared implementation. */
import { PROFILE_PHOTO } from "./profilePhoto.js";



// SINGLE SOURCE OF TRUTH
// Edit this file to update portfolio content. Components are presentation-only.
/* Shared navigation and section copy; anchor changes must match IDs in section components. */
export const PORTFOLIO_CONFIG = {
  /* Public availability text in the hero kicker. */
  availability: "Available for conversations",
  /* Public timezone label in the introduction. */
  timezone: "India · IST",
  /* Ordered [label, anchor] pairs shared by desktop/mobile menus; match section IDs. */
  navigation: [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["Stack", "#stack"],
    ["Contact", "#contact"]
  ],
  /* Introduction labels consumed by Hero.jsx. */
  hero: {
    /* Editorial number/label; update when reordering sections. */
    sectionNumber: "01 / introduction",
    /* Label preceding the first experience entry in the hero. */
    currentLabel: "Currently"
  },
  /* Selected-work section headings and introductory copy. */
  work: {
    /* Editorial number/label; update when reordering sections. */
    sectionNumber: "02 / selected work",
    /* Small uppercase category label rendered above the section heading where used. */
    meta: "selected work",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Things I’ve",
    /* Italic part of the section heading. */
    titleEmphasis: "built",
    /* Short introductory paragraph beneath a section title. */
    lede: "Systems where product thinking, backend architecture and AI meet practical software."
  },
  /* Experience/education section headings and introductory copy. */
  background: {
    /* Editorial number/label; update when reordering sections. */
    sectionNumber: "03 / background",
    /* Small uppercase category label rendered above the section heading where used. */
    meta: "Experience / education",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "The path",
    /* Italic part of the section heading. */
    titleEmphasis: "so far",
    /* Short introductory paragraph beneath a section title. */
    lede: "Backend AI engineering, MERN development, formal computer-science education, and focused training in modern AI systems."
  },
  /* Toolkit section headings and introductory copy consumed by Stack.jsx; tool lists live in STACK_GROUPS. */
  stack: {
    /* Editorial number/label; update when reordering sections. */
    sectionNumber: "04 / toolkit",
    /* Small uppercase category label rendered above the section heading where used. */
    meta: "Technical stack",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Tools of the",
    /* Italic part of the section heading. */
    titleEmphasis: "trade",
    /* Short introductory paragraph beneath a section title. */
    lede: "A practical stack spanning product interfaces, APIs, databases, AI integrations and delivery."
  },
  /* Contact-section heading and explanatory copy. */
  contact: {
    /* Editorial number/label; update when reordering sections. */
    sectionNumber: "05 / contact",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Let’s make something",
    /* Italic part of the section heading. */
    titleEmphasis: "useful.",
    /* Short introductory paragraph beneath a section title. */
    lede: "Have a product, backend problem or AI workflow in mind? Send a note and let’s start there."
  }
};

/* Public personal content used throughout the page; never put private credentials in this bundled object. */
export const PROFILE = {
  /* Record name or tool key; tool keys must match the icon registry. */
  name: "Shivam Sagar",
  /* First large hero name line. */
  firstName: "Shivam",
  /* Second large hero name line. */
  lastName: "Sagar",
  /* Display heading; edit this value for copy rather than the presentation component. */
  title: "Full Stack Developer | Backend & AI Engineering",
  /* Contact address or validated visitor field; update form/controller/schema together for constraint changes. */
  email: "shivamsagar372004@gmail.com",
  /* Display number; Contact strips punctuation when making its tel link. */
  phone: "+91-8102258822",
  /* LinkedIn destination shared by contact/footer. */
  linkedin: "https://linkedin.com/in/shivam-sagar-14241028a",
  /* GitHub profile destination shared by header/contact/footer. */
  github: "https://github.com/Shivam6050",
  /* Location metadata; not every PROFILE field is currently rendered. */
  location: "India",
  /* Separately cached portrait URL from profilePhoto.js. */
  photo: PROFILE_PHOTO,
  /* Short visitor-facing introduction; keep concise and factual. */
  summary:
    "I build full-stack applications and AI-powered backends, from React interfaces to APIs, databases and LLM integrations. Currently studying Computer Science and Engineering.",
  /* Education records in display order; the first period supplies the heading start year. */
  education: [
    {
      /* School/college name; logo selection is a separate lookup key. */
      institution: "Arya College of Engineering",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "arya-college",
      /* Human-readable date span; first education year is extracted for heading metadata. */
      period: "Aug. 2023 – May 2027",
      /* Qualification text, also used as the education React key. */
      degree: "Bachelor of Technology in Computer Science Engineering",
      /* Optional grade/result; empty values are omitted from the joined metadata line. */
      result: "CGPA: 7.5/10"
    },
    {
      /* School/college name; logo selection is a separate lookup key. */
      institution: "Sainik School, Bhubaneswar",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "sainik-school",
      /* Human-readable date span; first education year is extracted for heading metadata. */
      period: "",
      /* Qualification text, also used as the education React key. */
      degree: "Intermediate (Class XII)",
      /* Optional grade/result; empty values are omitted from the joined metadata line. */
      result: "71%"
    },
    {
      /* School/college name; logo selection is a separate lookup key. */
      institution: "Sainik School, Bhubaneswar",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "sainik-school",
      /* Human-readable date span; first education year is extracted for heading metadata. */
      period: "",
      /* Qualification text, also used as the education React key. */
      degree: "Matriculation (Class X)",
      /* Optional grade/result; empty values are omitted from the joined metadata line. */
      result: "83.8%"
    }
  ],
  /* Experience records in display order; first entry also supplies the hero current role. */
  experience: [
    {
      /* Employer name and experience React key; keep values unique within the list. */
      company: "FlyRank AI",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "flyrank",
      /* Human-readable date span; first education year is extracted for heading metadata. */
      period: "Jul. 2026 – Sep. 2026",
      /* Role label shown below the company. */
      role: "Backend AI Engineering Intern",
      /* Technology entries; keys must resolve in the appropriate logo registry. */
      stack: [["nodedotjs", "Node.js"], ["express", "Express.js"], ["typescript", "TypeScript"], ["prisma", "Prisma"], ["rest", "REST APIs"]],
      /* Ordered contribution bullets; edit these for experience content. */
      points: [
        "Designed and built a backend service for LLM API usage metering and billing, integrating multiple third-party LLM providers into a unified RESTful system.",
        "Implemented real-time usage tracking, threshold-based alerting, and usage-based billing workflows using Node.js, Express.js, TypeScript, and Prisma ORM.",
        "Worked on API contract design, backend architecture, retrieval-augmented workflows, evaluation, and testing for production-oriented AI systems.",
        "Completed 17 technical assignments across backend engineering and AI engineering, with 156+ verified hours across assignments, capstone delivery, and technical coursework."
      ]
    },
    {
      /* Employer name and experience React key; keep values unique within the list. */
      company: "GeeksforGeeks",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "geeksforgeeks",
      /* Human-readable date span; first education year is extracted for heading metadata. */
      period: "Jun. 2025 – Oct. 2025",
      /* Role label shown below the company. */
      role: "MERN Stack Developer Intern",
      /* Technology entries; keys must resolve in the appropriate logo registry. */
      stack: [["mongodb", "MongoDB"], ["express", "Express.js"], ["react", "React.js"], ["nodedotjs", "Node.js"]],
      /* Ordered contribution bullets; edit these for experience content. */
      points: [
        "Built and maintained full-stack web applications end to end using the MERN stack.",
        "Designed and implemented RESTful APIs for user authentication, data handling, and dynamic content delivery.",
        "Built reusable, responsive React components and optimized database queries and API response times for improved application performance.",
        "Collaborated on debugging, feature development, and version-control workflows using Git and GitHub."
      ]
    }
  ],
  /* Training cards consumed by Experience.jsx. */
  certifications: [
    {
      /* Training issuer and certification React key. */
      issuer: "Anthropic",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "anthropic",
      /* Display heading; edit this value for copy rather than the presentation component. */
      title: "Claude & Agentic AI",
      /* Supporting detail below the summary or training title. */
      detail: "Claude Code in Action, Claude Platform 101, Claude Code 101, Introduction to Model Context Protocol, MCP Advanced Topics, Claude Cowork, Claude 101, and AI Fluency."
    },
    {
      /* Training issuer and certification React key. */
      issuer: "Google Skills / DeepMind",
      /* Organization key in LOGOS; update registry when adding a new institution. */
      logo: "deepmind",
      /* Display heading; edit this value for copy rather than the presentation component. */
      title: "AI & LLM Training",
      /* Supporting detail below the summary or training title. */
      detail: "Skill badges covering small language models, language data, neural networks, large language models, generative AI, responsible AI, Google Cloud responsible AI, and prompt design in Agent Platform."
    }
  ],
  /* Sentences joined with spaces at the end of Experience.jsx. */
  additionalActivities: [
    "Actively building and deploying full-stack applications to strengthen practical software-engineering experience and production readiness.",
    "Practicing Data Structures and Algorithms in C++ and exploring scalable system design and backend architecture.",
    "Building practical expertise at the intersection of full-stack development, backend engineering, and applied AI/LLM systems.",
    "Long-term goal of building and launching technology products and startups."
  ]
};

/* Visible gallery records in render order; edit these to change website projects, not server seed data. */
export const PROJECTS = [
  {
    /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
    slug: "llm-usage-metering-billing-service",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "LLM Usage Metering & Billing Service",
    /* Category badge; persisted projects must match the Project schema enum. */
    tag: "FLAGSHIP",
    /* Short visitor-facing introduction; keep concise and factual. */
    summary: "A full-stack dashboard that aggregates real-time consumption data across multiple third-party LLM provider APIs into a unified interface.",
    /* Supporting detail below the summary or training title. */
    detail: "Built automated token-allocation alerts and centralized usage-based billing with a type-safe Node.js/Express/Prisma backend, PostgreSQL, and a React/TypeScript frontend.",
    /* Technology entries; keys must resolve in the appropriate logo registry. */
    stack: [
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "react", label: "React" }, { name: "typescript", label: "TypeScript" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "nodedotjs", label: "Node.js" }, { name: "express", label: "Express" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "prisma", label: "Prisma" }, { name: "postgresql", label: "PostgreSQL" }
    ],
    /* Full live-site URL; empty demo makes preview links fall back to source. */
    demo: "https://backend-capstone-llm-metering-pied.vercel.app",
    /* Single screenshot URL; a /assets path can replace the external thumbnail service. */
    preview: "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://backend-capstone-llm-metering-pied.vercel.app",
    /* Full source repository URL. */
    code: "https://github.com/Shivam6050/Backend-capstone-llm-metering",
    /* Legacy thumbnail pattern key retained in schema/data; current gallery renders preview images. */
    pattern: "pattern-1",
    /* Legacy thumbnail label, retained in data but not shown by current gallery. */
    thumbLabel: "metering.service",
    /* Legacy thumbnail subtitle, retained in data but not shown by current gallery. */
    thumbSub: "tokens → billing",
    /* Database sorting field; local frontend gallery follows array position instead. */
    order: 1
  },
  {
    /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
    slug: "learning-map-builder",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Learning Map Builder",
    /* Category badge; persisted projects must match the Project schema enum. */
    tag: "AI",
    /* Short visitor-facing introduction; keep concise and factual. */
    summary: "A multi-stage AI pipeline that creates personalized, budget-aware learning paths from goals and resources.",
    /* Supporting detail below the summary or training title. */
    detail: "Uses Gemini API and YouTube Data API with server-side URL validation, Supabase PostgreSQL row-level security, per-user AI rate limiting, GitHub Actions CI/CD, Vitest, Google OAuth, and automated dead-link detection.",
    /* Technology entries; keys must resolve in the appropriate logo registry. */
    stack: [
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "nextjs", label: "Next.js" }, { name: "typescript", label: "TypeScript" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "supabase", label: "Supabase" }, { name: "googlegemini", label: "Gemini API" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "youtube", label: "YouTube API" }, { name: "vitest", label: "Vitest" }
    ],
    /* Full live-site URL; empty demo makes preview links fall back to source. */
    demo: "https://learning-map-provider-bice.vercel.app",
    /* Single screenshot URL; a /assets path can replace the external thumbnail service. */
    preview: "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://learning-map-provider-bice.vercel.app",
    /* Full source repository URL. */
    code: "https://github.com/Shivam6050/learning-map-provider",
    /* Legacy thumbnail pattern key retained in schema/data; current gallery renders preview images. */
    pattern: "pattern-2",
    /* Legacy thumbnail label, retained in data but not shown by current gallery. */
    thumbLabel: "learning.map",
    /* Legacy thumbnail subtitle, retained in data but not shown by current gallery. */
    thumbSub: "gemini + yt",
    /* Database sorting field; local frontend gallery follows array position instead. */
    order: 2
  },
  {
    /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
    slug: "e-commerce-web-application",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "E-Commerce Web Application",
    /* Category badge; persisted projects must match the Project schema enum. */
    tag: "FULL-STACK",
    /* Short visitor-facing introduction; keep concise and factual. */
    summary: "A full-stack e-commerce platform with user authentication, product catalog management, shopping cart, and order-processing workflows.",
    /* Supporting detail below the summary or training title. */
    detail: "Built RESTful APIs with MongoDB, a dedicated admin dashboard for product and inventory operations, and a responsive customer interface with a scalable backend architecture.",
    /* Technology entries; keys must resolve in the appropriate logo registry. */
    stack: [
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "react", label: "React" }, { name: "nodedotjs", label: "Node.js" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "express", label: "Express" }, { name: "mongodb", label: "MongoDB" }
    ],
    /* Full live-site URL; empty demo makes preview links fall back to source. */
    demo: "https://ecommerce-project-frontend-two.vercel.app",
    /* Ordered preview URLs; multiple entries enable carousel controls/timing. */
    previews: [
      "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://ecommerce-project-frontend-two.vercel.app/",
      "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://ecommerce-project-frontend-two.vercel.app/cart",
      "https://image.thum.io/get/width/1200/crop/700/allowJPG/noanimate/https://ecommerce-project-frontend-two.vercel.app/place-order"
    ],
    /* Full source repository URL. */
    code: "https://github.com/Shivam6050/ecommerce-project",
    /* Legacy thumbnail pattern key retained in schema/data; current gallery renders preview images. */
    pattern: "pattern-3",
    /* Legacy thumbnail label, retained in data but not shown by current gallery. */
    thumbLabel: "shop.platform",
    /* Legacy thumbnail subtitle, retained in data but not shown by current gallery. */
    thumbSub: "cart → order",
    /* Database sorting field; local frontend gallery follows array position instead. */
    order: 3
  }
];

/* Toolkit categories in display order; keep Stack descriptions and toolkit icon keys aligned. */
export const STACK_GROUPS = [
  {
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Languages",
    /* Ordered [icon key, visible label] entries; add keys to toolkitIcons.js when extending. */
    items: [
      ["javascript", "JavaScript"], ["typescript", "TypeScript"], ["sql", "SQL"],
      ["cplusplus", "C++"], ["c", "C"], ["html5", "HTML5"], ["css3", "CSS3"]
    ]
  },
  {
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Frontend",
    /* Ordered [icon key, visible label] entries; add keys to toolkitIcons.js when extending. */
    items: [["react", "React.js"], ["nextjs", "Next.js"], ["responsive", "Responsive Web Design"]]
  },
  {
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Backend & Data",
    /* Ordered [icon key, visible label] entries; add keys to toolkitIcons.js when extending. */
    items: [
      ["nodedotjs", "Node.js"], ["express", "Express.js"], ["mongodb", "MongoDB"],
      ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["prisma", "Prisma ORM"]
    ]
  },
  {
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "AI / LLM",
    /* Ordered [icon key, visible label] entries; add keys to toolkitIcons.js when extending. */
    items: [
      ["googlegemini", "Gemini API"], ["anthropic", "Anthropic"], ["openai", "OpenAI"],
      ["rag", "RAG"], ["mcp", "MCP"], ["prompt", "Prompt Engineering"], ["evaluation", "AI Evaluation"]
    ]
  },
  {
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Security & Engineering",
    /* Ordered [icon key, visible label] entries; add keys to toolkitIcons.js when extending. */
    items: [
      ["auth", "Authentication"], ["authorization", "Authorization"], ["oauth", "Google OAuth"],
      ["security", "Row-Level Security"], ["ratelimit", "Rate Limiting"], ["system", "System Design"], ["dsa", "DSA"]
    ]
  },
  {
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Tools & Delivery",
    /* Ordered [icon key, visible label] entries; add keys to toolkitIcons.js when extending. */
    items: [
      ["git", "Git"], ["github", "GitHub"], ["githubactions", "GitHub Actions"],
      ["vercel", "Vercel"], ["netlify", "Netlify"], ["postman", "Postman"], ["vscode", "VS Code"], ["vitest", "Vitest"]
    ]
  }
];

/* Construct a Simple Icons CDN URL from slug and hex color; this requires an external image request. */
const icon = (name, color) => "https://cdn.simpleicons.org/" + name + "/" + color;

/* General logo registry for projects/experience/contact. Toolkit uses its separate original-brand local registry. */
export const LOGOS = {
  /* General logo URL for javascript; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  javascript: icon("javascript", "F7DF1E"), typescript: icon("typescript", "3178C6"), sql: icon("postgresql", "4169E1"),
  /* General logo URL for cplusplus; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  cplusplus: icon("cplusplus", "00599C"), c: icon("c", "A8B9CC"), html5: icon("html5", "E34F26"), css3: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Official_CSS_Logo.svg",
  /* General logo URL for react; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  react: icon("react", "61DAFB"), nextjs: icon("nextdotjs", "000000"), nodedotjs: icon("nodedotjs", "339933"),
  /* General logo URL for express; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  express: icon("express", "000000"), mongodb: icon("mongodb", "47A248"), postgresql: icon("postgresql", "4169E1"),
  /* General logo URL for supabase; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  supabase: icon("supabase", "3ECF8E"), prisma: icon("prisma", "2D3748"), googlegemini: icon("googlegemini", "8E75E2"),
  /* General logo URL for anthropic; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  anthropic: icon("anthropic", "000000"), openai: "https://commons.wikimedia.org/wiki/Special:Redirect/file/OpenAI_logo_2025_(symbol).svg", git: icon("git", "F05032"),
  /* GitHub profile destination shared by header/contact/footer. */
  github: icon("github", "181717"), gmail: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gmail_icon_%282026%29.svg", githubactions: icon("githubactions", "2088FF"), vscode: "https://raw.githubusercontent.com/MicrosoftDocs/visualstudio-docs/main/docs/media/vs-code-logo.svg",
  /* General logo URL for vercel; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  vercel: icon("vercel", "000000"), netlify: icon("netlify", "00C7B7"), postman: icon("postman", "FF6C37"),
  /* General logo URL for vitest; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  vitest: icon("vitest", "6E9F18"), youtube: icon("youtube", "FF0000"), linkedin: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
  /* General logo URL for google; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  google: icon("google", "4285F4"), responsive: icon("css3", "1572B6"), rag: "https://cdn.simpleicons.org/langchain/1C3C3C",
  /* General logo URL for mcp; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  mcp: icon("modelcontextprotocol", "000000"), prompt: "https://github.com/webmaxru/prompt-engineering-logo/raw/main/assets/prompt-engineering-logo.svg", evaluation: icon("vitest", "6E9F18"),
  /* General logo URL for auth; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  auth: "https://cdn.simpleicons.org/openid/3C3C3C", authorization: "https://cdn.simpleicons.org/keycloak/4D4D4D", oauth: "https://cdn.simpleicons.org/google/4285F4",
  /* General logo URL for security; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  security: icon("owasp", "000000"), ratelimit: icon("cloudflare", "F38020"), system: icon("diagramsdotnet", "F08705"),
  /* General logo URL for dsa; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  dsa: icon("cplusplus", "00599C"),
  /* General logo URL for rest; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  rest: icon("postman", "FF6C37"),
  /* General logo URL for flyrank; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  flyrank: "https://flyrank.ai/favicon.ico",
  /* General logo URL for geeksforgeeks; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  geeksforgeeks: "https://www.geeksforgeeks.org/favicon.ico",
  /* General logo URL for deepmind; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  deepmind: "https://deepmind.google/favicon.ico",
  /* General logo URL for arya-college; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  "arya-college": "https://www.aryacollege.org/wp-content/uploads/2026/05/IMG_0369.webp",
  /* General logo URL for sainik-school; replace its source here. Toolkit originals use toolkitIcons.js instead. */
  "sainik-school": "/assets/sainik-school-bhubaneswar.png"
};
