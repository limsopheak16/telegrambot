"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./db/connection");
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const classRoutes_1 = __importDefault(require("./routes/classRoutes"));
const telegramBot_1 = require("./bot/telegramBot");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/student", studentRoutes_1.default);
app.use("/api/teacher", teacherRoutes_1.default);
app.use("/api/class", classRoutes_1.default);
// Connect to database and start server
connection_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connection initialized");
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    // Start the Telegram bot
    (0, telegramBot_1.startBot)();
})
    .catch((error) => {
    console.error("Error during initialization:", error);
});
