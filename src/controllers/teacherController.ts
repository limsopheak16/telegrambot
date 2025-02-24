import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";
import { Teacher } from "../models/Teacher";

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const teachers = await teacherRepository.find({
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
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return res.status(500).json({ message: "Server error" });
  }
};