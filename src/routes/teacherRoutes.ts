import express, { Request, Response } from "express";
import { getTeachers } from "../controllers/teacherController";
const router = express.Router();

// Explicit cast approach
router.get("/", (req: Request, res: Response) => {
  getTeachers(req, res);
});

export default router;