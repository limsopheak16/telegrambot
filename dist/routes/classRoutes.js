"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classController_1 = require("../controllers/classController");
const router = express_1.default.Router();
// Explicit cast approach
router.get("/", (req, res) => {
    (0, classController_1.getClasses)(req, res);
});
exports.default = router;
