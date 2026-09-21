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

export const STACK_GROUPS = [
  {
    title: "Languages",
    items: [
      ["javascript", "JavaScript"],
      ["typescript", "TypeScript"],
      ["cplusplus", "C++"],
      ["html5", "HTML5"],
      ["css3", "CSS3"]
    ]
  },
  {
    title: "Frontend",
    items: [
      ["react", "React.js"],
      ["nextjs", "Next.js"],
      ["tailwind", "Tailwind"]
    ]
  },
  {
    title: "Backend",
    items: [
      ["nodedotjs", "Node.js"],
      ["express", "Express"],
      ["postgresql", "PostgreSQL"],
      ["mongodb", "MongoDB"],
      ["prisma", "Prisma"],
      ["supabase", "Supabase"]
    ]
  },
  {
    title: "AI / LLM",
    items: [
      ["googlegemini", "Gemini API"],
      ["anthropic", "Anthropic"],
      ["openai", "OpenAI"]
    ]
  },
  {
    title: "Testing",
    items: [
      ["vitest", "Vitest"],
      ["postman", "Postman"]
    ]
  },
  {
    title: "DevOps & Tools",
    items: [
      ["git", "Git"],
      ["github", "GitHub"],
      ["githubactions", "GitHub Actions"],
      ["vercel", "Vercel"],
      ["netlify", "Netlify"],
      ["vscode", "VS Code"]
    ]
  }
];

const icon = (name, color) => `https://cdn.simpleicons.io/${name}/${color}`;

export const LOGOS = {
  javascript: icon("javascript", "F7DF1E"),
  typescript: icon("typescript", "3178C6"),
  cplusplus: icon("cplusplus", "00599C"),
  html5: icon("html5", "E34F26"),
  css3: icon("css3", "1572B6"),
  react: icon("react", "61DAFB"),
  nextjs: icon("nextdotjs", "000000"),
  tailwind: icon("tailwindcss", "06B6D4"),
  nodedotjs: icon("nodedotjs", "339933"),
  express: icon("express", "000000"),
  mongodb: icon("mongodb", "47A248"),
  postgresql: icon("postgresql", "4169E1"),
  supabase: icon("supabase", "3ECF8E"),
  prisma: icon("prisma", "2D3748"),
  googlegemini: icon("googlegemini", "8E75E2"),
  anthropic: icon("anthropic", "000000"),
  openai: icon("openai", "412991"),
  git: icon("git", "F05032"),
  github: icon("github", "181717"),
  githubactions: icon("githubactions", "2088FF"),
  vscode: icon("visualstudiocode", "007ACC"),
  vercel: icon("vercel", "000000"),
  netlify: icon("netlify", "00C7B7"),
  postman: icon("postman", "FF6C37"),
  vitest: icon("vitest", "6E9F18"),
  google: icon("google", "4285F4"),
  youtube: icon("youtube", "FF0000"),
  linkedin: icon("linkedin", "0A66C2")
};
