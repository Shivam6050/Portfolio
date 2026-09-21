import { Router } from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = Router();

router.get("/", getProjects);
router.get("/:slug", getProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
