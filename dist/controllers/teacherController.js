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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeachers = void 0;
const connection_1 = require("../db/connection");
const Teacher_1 = require("../models/Teacher");
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherRepository = connection_1.AppDataSource.getRepository(Teacher_1.Teacher);
        const teachers = yield teacherRepository.find({
            order: {
                first_name: "ASC",
                last_name: "ASC",
            },
            take: 10,
        });
        // Format the teacher data for display
        const formattedTeachers = teachers.map(teacher => ({
            id: teacher.teacher_id,
            fullName: `${teacher.first_name} ${teacher.last_name}`,
            email: teacher.email,
            phone: teacher.phone,
        }));
        return res.status(200).json(formattedTeachers);
    }
    catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getTeachers = getTeachers;
