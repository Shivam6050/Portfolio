/**
 * Central JSON error policy: malformed JSON/validation/cast -> 400, duplicate -> 409, unknown -> generic 500. Register after routers. Keep the four-argument handler signature and avoid logging submitted bodies or private connection details.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Central JSON error policy: malformed JSON/validation/cast -> 400, duplicate -> 409, unknown -> generic 500. Register after routers. Keep the four-argument handler signature and avoid logging submitted bodies or private connection details. */
export function notFound(req, res) {
  /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
  res.status(404).json({
    /* API envelope flag; frontend requires true as well as successful HTTP status. */
    success: false,
    /* Content/feedback text; keep internal database details out of API errors. */
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

/* Central JSON error policy: malformed JSON/validation/cast -> 400, duplicate -> 409, unknown -> generic 500. Register after routers. Keep the four-argument handler signature and avoid logging submitted bodies or private connection details. */
export function errorHandler(error, req, res, next) {
  // Do not log request bodies, credentials, or database documents.
  /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
  console.error({ name: error.name, code: error.code, type: error.type });
  /* Guard: error.type === "entity.parse.failed". Run the following branch only when true; preserve early returns when modifying this flow. */
  if (error.type === "entity.parse.failed") {
    /* Return res.status(400).json({ success: false, message: "Invalid JSON request body" }); this ends the current function path. */
    return res.status(400).json({ success: false, message: "Invalid JSON request body" });
  }

  /* Guard: error.code === 11000. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (error.code === 11000) {
    /* Return res.status(409).json({ success: false, message: "A record with that value already exists" }); this ends the current function path. */
    return res.status(409).json({ success: false, message: "A record with that value already exists" });
  }

  /* Guard: error.name === "ValidationError". Run the following branch only when true; preserve early returns when modifying this flow. */
  if (error.name === "ValidationError") {
    /* Return res.status(400).json({ success: false, message: "Validation failed", errors: Object.values(erro; this ends the current function path. */
    return res.status(400).json({
      /* API envelope flag; frontend requires true as well as successful HTTP status. */
      success: false,
      /* Content/feedback text; keep internal database details out of API errors. */
      message: "Validation failed",
      /* Expose validation messages only, not complete database error objects or submitted documents. */
      errors: Object.values(error.errors).map((item) => item.message)
    });
  }

  /* Possible error status to validate before assigning the HTTP response. */
  const candidate = error.statusCode || error.status;
  /* Error HTTP status constrained to 400-599, otherwise defaulting to 500. */
  const status = error.name === "CastError" ? 400 :
    (Number.isInteger(candidate) && candidate >= 400 && candidate <= 599 ? candidate : 500);
  /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
  res.status(status).json({
    /* API envelope flag; frontend requires true as well as successful HTTP status. */
    success: false,
    /* Content/feedback text; keep internal database details out of API errors. */
    message: status >= 500 ? "Internal server error" : (error.message || "Invalid request")
  });
}
