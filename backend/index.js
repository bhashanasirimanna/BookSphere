import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utils
import connectDB from "./config/db.js";

//Routes
import reviewRoutes from "./routes/reviewRoutes.js"

// Load environment variables
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies) to be included
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Conn Testing
app.get("/api", (req, res) => {
  res.send("Connected to Book Review API");
});

// Reviews Route
app.use("/review", reviewRoutes);

//listen to the port
app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;
