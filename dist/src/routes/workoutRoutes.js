"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutController_1 = require("../controllers/workoutController");
const router = express_1.default.Router();
//Route to check route path is good
router.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
});
//Routes for functions
router.post('/workout', workoutController_1.createWorkout);
router.get('/workout', workoutController_1.getWorkout);
router.get('/workout/:id', workoutController_1.readWorkout);
router.delete('/workout/:id', workoutController_1.deleteWorkout);
router.put('/workout/:id', workoutController_1.updateWorkout);
exports.default = router;
