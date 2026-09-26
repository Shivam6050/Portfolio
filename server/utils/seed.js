/**
 * Manual initializer (npm run seed in server). Upsert by slug can overwrite matching project fields but does not delete unrelated rows. views is initialized only when missing. Edit frontend constants separately for visible portfolio content.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import side effects from dotenv/config; use its public API here rather than modifying installed dependency files. */
import "dotenv/config";
/* Import mongoose from mongoose; use its public API here rather than modifying installed dependency files. */
import mongoose from "mongoose";
/* Import connectDB from ../config/db.js; edit that module for the shared implementation. */
import { connectDB } from "../config/db.js";
/* Import Project from ../models/Project.js; edit that module for the shared implementation. */
import Project from "../models/Project.js";
/* Import Stat from ../models/Stat.js; edit that module for the shared implementation. */
import Stat from "../models/Stat.js";

/* Project collection; frontend uses local PROJECTS, while server/seed data is a separate MongoDB source. */
const projects = [
  {
    /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
    slug: "llm-usage-metering-billing-service",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "LLM Usage Metering & Billing Service",
    /* Category badge; persisted projects must match the Project schema enum. */
    tag: "FLAGSHIP",
    /* Short visitor-facing introduction; keep concise and factual. */
    summary: "A production-oriented backend and dashboard for measuring LLM consumption and turning usage into reliable billing signals.",
    /* Supporting detail below the summary or training title. */
    detail: "Full-stack dashboard aggregating real-time LLM token consumption, automated notifications for token exhaustion, usage metering, threshold-based alerting and a usage-based billing workflow.",
    /* Technology entries; keys must resolve in the appropriate logo registry. */
    stack: [
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "react", label: "React" }, { name: "typescript", label: "TypeScript" }, { name: "nodedotjs", label: "Node.js" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "express", label: "Express" }, { name: "prisma", label: "Prisma" }, { name: "postgresql", label: "PostgreSQL" }
    ],
    /* Full live-site URL; empty demo makes preview links fall back to source. */
    demo: "https://backend-capstone-llm-metering-pied.vercel.app",
    /* Full source repository URL. */
    code: "https://github.com/Shivam6050/Backend-capstone-llm-metering",
    /* Legacy thumbnail pattern key retained in schema/data; current gallery renders preview images. */
    pattern: "pattern-1", thumbLabel: "metering.service", thumbSub: "tokens → $$", order: 1
  },
  {
    /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
    slug: "learning-map-builder",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "Learning Map Builder",
    /* Category badge; persisted projects must match the Project schema enum. */
    tag: "AI",
    /* Short visitor-facing introduction; keep concise and factual. */
    summary: "An AI-assisted learning path builder that turns goals and resources into structured, personalized maps.",
    /* Supporting detail below the summary or training title. */
    detail: "Multi-stage AI pipeline for personalized learning paths using Gemini and YouTube, with strict server-side URL validation, PostgreSQL RLS through Supabase, Vitest coverage, GitHub Actions CI/CD and a daily cron for dead-link detection.",
    /* Technology entries; keys must resolve in the appropriate logo registry. */
    stack: [
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "nextjs", label: "Next.js" }, { name: "typescript", label: "TypeScript" }, { name: "supabase", label: "Supabase" },
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "googlegemini", label: "Gemini API" }, { name: "youtube", label: "YouTube API" }, { name: "vitest", label: "Vitest" }
    ],
    /* Full live-site URL; empty demo makes preview links fall back to source. */
    demo: "https://learning-map-provider-bice.vercel.app",
    /* Full source repository URL. */
    code: "https://github.com/Shivam6050/learning-map-provider",
    /* Legacy thumbnail pattern key retained in schema/data; current gallery renders preview images. */
    pattern: "pattern-2", thumbLabel: "learning.map", thumbSub: "gemini + yt", order: 2
  },
  {
    /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
    slug: "e-commerce-web-application",
    /* Display heading; edit this value for copy rather than the presentation component. */
    title: "E-Commerce Web Application",
    /* Category badge; persisted projects must match the Project schema enum. */
    tag: "FULL-STACK",
    /* Short visitor-facing introduction; keep concise and factual. */
    summary: "A full-stack commerce platform with authentication, catalog, cart, orders and an administration surface.",
    /* Supporting detail below the summary or training title. */
    detail: "MERN e-commerce application with RESTful APIs, reusable React interfaces, scalable backend architecture and a foundation for payment gateway integration.",
    /* Technology entries; keys must resolve in the appropriate logo registry. */
    stack: [
      { /* Record name or tool key; tool keys must match the icon registry. */ name: "react", label: "React" }, { name: "nodedotjs", label: "Node.js" }, { name: "express", label: "Express" }, { name: "mongodb", label: "MongoDB" }
    ],
    /* Full live-site URL; empty demo makes preview links fall back to source. */
    demo: "https://ecommerce-project-frontend-two.vercel.app",
    /* Full source repository URL. */
    code: "https://github.com/Shivam6050/ecommerce-project",
    /* Legacy thumbnail pattern key retained in schema/data; current gallery renders preview images. */
    pattern: "pattern-3", thumbLabel: "shop.platform", thumbSub: "cart → order", order: 3
  }
];

/* Group fallible work with its catch/finally path; cleanup must still run after failures. */
try {
  /* Await the shared connection; surrounding error handling owns any connection failure. */
  await connectDB();
  /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
  for (const project of projects) {
    /* Apply this atomic database update; preserve its identity filter and intentional insert/update operators. */
    await Project.findOneAndUpdate({ slug: project.slug }, { $set: project }, { upsert: true, runValidators: true });
  }
  /* Apply this atomic database update; preserve its identity filter and intentional insert/update operators. */
  await Stat.findOneAndUpdate(
    { /* Record/counter identity; public stats use views. */ key: "views" },
    { /* Initialize views only if a new record is inserted; preserve an existing accumulated count. */ $setOnInsert: { key: "views", value: 0 } },
    { /* Insert when the filter finds no record, otherwise update. */ upsert: true, new: true }
  );
  /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
  console.log(`Seeded ${projects.length} projects.`);
} /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
  /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
  console.error("Seed failed:", error);
  /* Report failure to the shell while allowing finally cleanup to complete. */
  process.exitCode = 1;
} finally {
  /* Release observer/database resources during cleanup. */
  await mongoose.disconnect();
}
