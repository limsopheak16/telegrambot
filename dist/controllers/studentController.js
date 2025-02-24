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
exports.getStudents = void 0;
const connection_1 = require("../db/connection");
const Student_1 = require("../models/Student");
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = connection_1.AppDataSource.getRepository(Student_1.Student);
        const students = yield studentRepository.find({
            order: {
                first_name: "ASC",
                last_name: "ASC",
            },
            take: 10,
        });
        return res.status(200).json(students);
    }
    catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getStudents = getStudents;
