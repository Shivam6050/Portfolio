export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: "A record with that value already exists" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(error.errors).map((item) => item.message)
    });
  }

  const status = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  res.status(status).json({
    success: false,
    message: status >= 500 && isProduction
      ? "Internal server error"
      : error.message || "Internal server error"
  });
}
