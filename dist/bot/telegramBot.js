"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const connection_1 = require("../db/connection");
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Class_1 = require("../models/Class");
// Replace with your actual bot token
const token = "7567819659:AAGbx5OwcwWNdM3w3WvJhmVkkJkdRNX6fYY";
const startBot = () => {
    const bot = new node_telegram_bot_api_1.default(token, { polling: true });
    bot.onText(/\/start/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Hello from YourName's Bot, how can I help you?");
    }));
    bot.onText(/\/student/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id;
        try {
            const studentRepository = connection_1.AppDataSource.getRepository(Student_1.Student);
            const students = yield studentRepository.find({
                order: {
                    first_name: "ASC",
                    last_name: "ASC",
                },
                take: 10,
            });
            if (students.length === 0) {
                bot.sendMessage(chatId, "No students found.");
                return;
            }
            let message = "Top 10 students:\n\n";
            students.forEach((student, index) => {
                message += `${index + 1}. ${student.first_name} ${student.last_name} - ${student.email}\n`;
            });
            bot.sendMessage(chatId, message);
        }
        catch (error) {
            console.error("Error fetching students for bot:", error);
            bot.sendMessage(chatId, "Sorry, there was an error fetching students.");
        }
    }));
    bot.onText(/\/teacher/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id;
        try {
            const teacherRepository = connection_1.AppDataSource.getRepository(Teacher_1.Teacher);
            const teachers = yield teacherRepository.find({
                order: {
                    first_name: "ASC",
                    last_name: "ASC",
                },
                take: 10,
            });
            if (teachers.length === 0) {
                bot.sendMessage(chatId, "No teachers found.");
                return;
            }
            let message = "Top 10 teachers:\n\n";
            teachers.forEach((teacher, index) => {
                message += `${index + 1}. ${teacher.first_name} ${teacher.last_name} - ${teacher.email}\n`;
            });
            bot.sendMessage(chatId, message);
        }
        catch (error) {
            console.error("Error fetching teachers for bot:", error);
            bot.sendMessage(chatId, "Sorry, there was an error fetching teachers.");
        }
    }));
    // Bonus
    bot.onText(/\/class/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = msg.chat.id;
        try {
            const classRepository = connection_1.AppDataSource.getRepository(Class_1.Class);
            const classes = yield classRepository
                .createQueryBuilder("class")
                .leftJoinAndSelect("class.teacher", "teacher")
                .orderBy("class.class_name", "ASC")
                .getMany();
            if (classes.length === 0) {
                bot.sendMessage(chatId, "No classes found.");
                return;
            }
            let message = "All classes:\n\n";
            classes.forEach((classItem, index) => {
                const teacherName = classItem.teacher
                    ? `${classItem.teacher.first_name} ${classItem.teacher.last_name}`
                    : 'No teacher assigned';
                message += `${index + 1}. ${classItem.class_name} (${classItem.subject}) - Teacher: ${teacherName}\n`;
            });
            bot.sendMessage(chatId, message);
        }
        catch (error) {
            console.error("Error fetching classes for bot:", error);
            bot.sendMessage(chatId, "Sorry, there was an error fetching classes.");
        }
    }));
    console.log("Telegram bot started successfully");
};
exports.startBot = startBot;
