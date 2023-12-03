"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutController_1 = require("../controllers/workoutController");
const router = express_1.default.Router();
router.post('/workout', workoutController_1.createWorkout);
router.get('/workout', workoutController_1.getWorkout);
exports.default = router;
