import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";
import { Class } from "../models/Class";

export const getClasses = async (req: Request, res: Response) => {
  try {
    const classRepository = AppDataSource.getRepository(Class);
    const classes = await classRepository
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
  } catch (error) {
    console.error("Error fetching classes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};