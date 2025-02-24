import express, { Request, Response } from "express";
import { getStudents } from "../controllers/studentController";

const router = express.Router();

// Explicit cast approach
router.get("/", (req: Request, res: Response) => {
  getStudents(req, res);
});

export default router;