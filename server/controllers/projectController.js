/**
 * Database handlers; only reads are mounted. Create/update/delete are unmounted helpers, not a secured admin API. Do not expose writes without authentication, authorization, and field allowlisting. Visible frontend projects come from constants.js.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import Project from ../models/Project.js; edit that module for the shared implementation. */
import Project from "../models/Project.js";

/* Read database projects sorted by order/createdAt; lean returns plain objects instead of Mongoose documents. */
export async function getProjects(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Project collection; frontend uses local PROJECTS, while server/seed data is a separate MongoDB source. */
    const projects = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.json({ success: true, data: projects });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
    /* Forward failure to Express error middleware; do not return raw database internals here. */
    next(error);
  }
}

/* Look up a project by URL slug and return 404 when absent; keep route/query parameter names aligned. */
export async function getProject(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Database query result; read helpers return lean objects and write helpers remain unmounted. */
    const project = await Project.findOne({ slug: req.params.slug }).lean();
    /* Guard: !project. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.json({ success: true, data: project });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
    /* Forward failure to Express error middleware; do not return raw database internals here. */
    next(error);
  }
}

/* Unmounted write helper: do not publish this handler without authorization and allowed-field validation. */
export async function createProject(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Database query result; read helpers return lean objects and write helpers remain unmounted. */
    const project = await Project.create(req.body);
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.status(201).json({ success: true, data: project });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
    /* Forward failure to Express error middleware; do not return raw database internals here. */
    next(error);
  }
}

/* Unmounted write helper: validate updates and return the new document. Missing records return 404. */
export async function updateProject(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Database query result; read helpers return lean objects and write helpers remain unmounted. */
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      /* Return updated record rather than pre-update contents. */
      new: true,
      /* Run schema validators on the update. */
      runValidators: true
    });
    /* Guard: !project. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.json({ success: true, data: project });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
    /* Forward failure to Express error middleware; do not return raw database internals here. */
    next(error);
  }
}

/* Unmounted destructive helper: missing records return 404; authorization would be required before mounting. */
export async function deleteProject(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Database query result; read helpers return lean objects and write helpers remain unmounted. */
    const project = await Project.findByIdAndDelete(req.params.id);
    /* Guard: !project. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.json({ success: true, message: "Project deleted" });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
    /* Forward failure to Express error middleware; do not return raw database internals here. */
    next(error);
  }
}
