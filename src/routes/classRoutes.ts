import express, { Request, Response } from "express";
import { getClasses } from "../controllers/classController";
const router = express.Router();

// Explicit cast approach
router.get("/", (req: Request, res: Response) => {
  getClasses(req, res);
});

export default router;