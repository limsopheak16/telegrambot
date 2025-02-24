"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherController_1 = require("../controllers/teacherController");
const router = express_1.default.Router();
// Explicit cast approach
router.get("/", (req, res) => {
    (0, teacherController_1.getTeachers)(req, res);
});
exports.default = router;
