import { Router } from "express";
import { getProjects, getProject } from "../controllers/projectController.js";

const router = Router();

// Portfolio project data is public and read-only.
router.get("/", getProjects);
router.get("/:slug", getProject);

export default router;
