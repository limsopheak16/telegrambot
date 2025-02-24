"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Class_1 = require("../models/Class");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "postgres",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "telegram_bot_db",
    synchronize: true,
    logging: true,
    entities: [Student_1.Student, Teacher_1.Teacher, Class_1.Class],
    subscribers: [],
    migrations: [],
});
