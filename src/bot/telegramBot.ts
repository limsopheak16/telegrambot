import TelegramBot from "node-telegram-bot-api";
import { AppDataSource } from "../db/connection";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";
import { Class } from "../models/Class";

// Replace with your actual bot token
const token = "7567819659:AAGbx5OwcwWNdM3w3WvJhmVkkJkdRNX6fYY";

export const startBot = () => {
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Hello from YourName's Bot, how can I help you?");
  });

  bot.onText(/\/student/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const students = await studentRepository.find({
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
    } catch (error) {
      console.error("Error fetching students for bot:", error);
      bot.sendMessage(chatId, "Sorry, there was an error fetching students.");
    }
  });

  bot.onText(/\/teacher/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const teachers = await teacherRepository.find({
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
    } catch (error) {
      console.error("Error fetching teachers for bot:", error);
      bot.sendMessage(chatId, "Sorry, there was an error fetching teachers.");
    }
  });

  // Bonus
  bot.onText(/\/class/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const classRepository = AppDataSource.getRepository(Class);
      const classes = await classRepository
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
    } catch (error) {
      console.error("Error fetching classes for bot:", error);
      bot.sendMessage(chatId, "Sorry, there was an error fetching classes.");
    }
  });

  console.log("Telegram bot started successfully");
};