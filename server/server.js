import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projects.js";
import messageRoutes from "./routes/messages.js";
import statRoutes from "./routes/stats.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "100kb" }));

app.use((req, res, next) => {
  const started = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - started}ms`);
  });
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API connected", time: new Date().toISOString() });
});

app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stats", statRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Portfolio API running on http://localhost:${PORT}`);
  });
});
