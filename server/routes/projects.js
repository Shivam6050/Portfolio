import { withDatabase } from "../middleware/withDatabase.js";
import { Router } from "express";
import { getProjects, getProject } from "../controllers/projectController.js";

const router = Router();

// Portfolio project data is public and read-only.
router.get("/", withDatabase, getProjects);
router.get("/:slug", withDatabase, getProject);

export default router;
