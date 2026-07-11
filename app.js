import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import morgan from "morgan";
import connection from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import screeningRoutes from "./routes/screeningRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import methodOverride from "method-override";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

// Needed because we're using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));



// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.use("/", dashboardRoutes);
app.use("/health", healthRoutes);
app.use("/resumes", resumeRoutes);
app.use("/screenings", screeningRoutes);
app.use("/screenings", progressRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Hirely running on http://localhost:${PORT}`);
});