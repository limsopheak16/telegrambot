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
exports.getClasses = void 0;
const connection_1 = require("../db/connection");
const Class_1 = require("../models/Class");
const getClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classRepository = connection_1.AppDataSource.getRepository(Class_1.Class);
        const classes = yield classRepository
            .createQueryBuilder("class")
            .leftJoinAndSelect("class.teacher", "teacher")
            .orderBy("class.class_name", "ASC")
            .getMany();
        // Format the class data for display
        const formattedClasses = classes.map(classItem => ({
            id: classItem.class_id,
            className: classItem.class_name,
            subject: classItem.subject,
            teacher: classItem.teacher ? `${classItem.teacher.first_name} ${classItem.teacher.last_name}` : 'No teacher assigned'
        }));
        return res.status(200).json(formattedClasses);
    }
    catch (error) {
        console.error("Error fetching classes:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getClasses = getClasses;
