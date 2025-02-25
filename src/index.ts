import express from "express";
import { AppDataSource } from "./db/connection";
import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import classRoutes from "./routes/classRoutes";
import { startBot } from "./bot/telegramBot";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/class", classRoutes);

// Connect to database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection initialized");
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    // Start the Telegram bot
    startBot();
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
  });