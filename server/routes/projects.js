/**
 * Public read-only routes under /api/projects. Detail lookup uses slug, not MongoDB ID. Unmounted write handlers require a separate authenticated/authorized design before exposure.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import withDatabase from ../middleware/withDatabase.js; edit that module for the shared implementation. */
import { withDatabase } from "../middleware/withDatabase.js";
/* Import Router from express; use its public API here rather than modifying installed dependency files. */
import { Router } from "express";
/* Import getProjects, getProject from ../controllers/projectController.js; edit that module for the shared implementation. */
import { getProjects, getProject } from "../controllers/projectController.js";

/* Express subrouter; server.js provides the /api prefix for relative paths below. */
const router = Router();

// Portfolio project data is public and read-only.
/* Register this relative route under its server.js /api prefix. Keep write rate limiting before database connection. */
router.get("/", withDatabase, getProjects);
/* Register this relative route under its server.js /api prefix. Keep write rate limiting before database connection. */
router.get("/:slug", withDatabase, getProject);

/* Export router as this module default for its importer/host. */
export default router;
