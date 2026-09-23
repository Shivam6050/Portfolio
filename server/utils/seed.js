import "dotenv/config";
import { connectDB } from "../config/db.js";
import Project from "../models/Project.js";
import Stat from "../models/Stat.js";
import { PROJECTS } from "../../shared/projects.js";

try {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(PROJECTS);
  await Stat.findOneAndUpdate(
    { key: "views" },
    { $setOnInsert: { key: "views", value: 0 } },
    { upsert: true, new: true }
  );
  console.log(`Seeded ${PROJECTS.length} projects.`);
} catch (error) {
  console.error("Seed failed:", error);
  process.exitCode = 1;
} finally {
  process.exit();
}
