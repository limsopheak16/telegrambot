import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";
import { Student } from "../models/Student";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const students = await studentRepository.find({
      order: {
        first_name: "ASC",
        last_name: "ASC",
      },
      take: 10,
    });
    
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Server error" });
  }
};