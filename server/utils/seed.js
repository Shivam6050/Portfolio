import "dotenv/config";
import { connectDB } from "../config/db.js";
import Project from "../models/Project.js";
import Stat from "../models/Stat.js";

const projects = [
  {
    slug: "llm-usage-metering-billing-service",
    title: "LLM Usage Metering & Billing Service",
    tag: "FLAGSHIP",
    summary: "A production-oriented backend and dashboard for measuring LLM consumption and turning usage into reliable billing signals.",
    detail: "Full-stack dashboard aggregating real-time LLM token consumption, automated notifications for token exhaustion, usage metering, threshold-based alerting and a usage-based billing workflow.",
    stack: [
      { name: "react", label: "React" }, { name: "typescript", label: "TypeScript" }, { name: "nodedotjs", label: "Node.js" },
      { name: "express", label: "Express" }, { name: "prisma", label: "Prisma" }, { name: "postgresql", label: "PostgreSQL" }
    ],
    demo: "",
    code: "https://github.com/Shivam6050/Backend-capstone-llm-metering",
    pattern: "pattern-1", thumbLabel: "metering.service", thumbSub: "tokens → $$", order: 1
  },
  {
    slug: "learning-map-builder",
    title: "Learning Map Builder",
    tag: "AI",
    summary: "An AI-assisted learning path builder that turns goals and resources into structured, personalized maps.",
    detail: "Multi-stage AI pipeline for personalized learning paths using Gemini and YouTube, with strict server-side URL validation, PostgreSQL RLS through Supabase, Vitest coverage, GitHub Actions CI/CD and a daily cron for dead-link detection.",
    stack: [
      { name: "nextjs", label: "Next.js" }, { name: "typescript", label: "TypeScript" }, { name: "supabase", label: "Supabase" },
      { name: "googlegemini", label: "Gemini API" }, { name: "youtube", label: "YouTube API" }, { name: "vitest", label: "Vitest" }
    ],
    demo: "",
    code: "https://github.com/Shivam6050/learning-map-provider",
    pattern: "pattern-2", thumbLabel: "learning.map", thumbSub: "gemini + yt", order: 2
  },
  {
    slug: "e-commerce-web-application",
    title: "E-Commerce Web Application",
    tag: "FULL-STACK",
    summary: "A full-stack commerce platform with authentication, catalog, cart, orders and an administration surface.",
    detail: "MERN e-commerce application with RESTful APIs, reusable React interfaces, scalable backend architecture and a foundation for payment gateway integration.",
    stack: [
      { name: "react", label: "React" }, { name: "nodedotjs", label: "Node.js" }, { name: "express", label: "Express" }, { name: "mongodb", label: "MongoDB" }
    ],
    demo: "",
    code: "https://github.com/Shivam6050/ecommerce-project",
    pattern: "pattern-3", thumbLabel: "shop.platform", thumbSub: "cart → order", order: 3
  }
];

try {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(projects);
  await Stat.findOneAndUpdate(
    { key: "views" },
    { $setOnInsert: { key: "views", value: 0 } },
    { upsert: true, new: true }
  );
  console.log(`Seeded ${projects.length} projects.`);
} catch (error) {
  console.error("Seed failed:", error);
  process.exitCode = 1;
} finally {
  process.exit();
}
