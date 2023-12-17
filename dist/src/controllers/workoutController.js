"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWorkout = exports.updateWorkout = exports.deleteWorkout = exports.getWorkout = exports.createWorkout = void 0;
const database_1 = __importDefault(require("../models/database"));
//Since this is a simple and straight forward application the CRUD operations are being handled by the controller
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, duration, calories } = req.body;
    console.log(req.body);
    try {
        const conn = yield database_1.default;
        //Inserting workout into database
        const result = yield conn.query('INSERT INTO workouts (name, duration, calories) VALUES (?, ?, ?)', [
            name,
            duration,
            calories,
        ]);
        const insertId = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.insertId;
        res.json({ id: insertId, name, duration, calories });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createWorkout = createWorkout;
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.default;
        //getting a workout from the database
        const result = yield conn.query('SELECT * FROM workouts');
        if (Array.isArray(result[0])) {
            const workouts = result[0];
            res.json(workouts);
        }
        else {
            console.error('Unexpected result format:', result);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getWorkout = getWorkout;
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workoutId = parseInt(req.params.id, 10);
    try {
        const conn = yield database_1.default;
        //getting the workout from the database
        const [checkResult] = yield conn.execute('SELECT * FROM workouts WHERE id = ?', [workoutId]);
        if (Array.isArray(checkResult) && checkResult.length > 0) {
            //deleting workout from the database once it is selected
            const [deleteResult] = yield conn.execute('DELETE FROM workouts WHERE id = ?', [workoutId]);
            if (deleteResult.affectedRows > 0) {
                res.json({ message: 'Workout deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Workout not found' });
            }
        }
        else {
            res.status(404).json({ error: 'Workout not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteWorkout = deleteWorkout;
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workoutId = parseInt(req.params.id, 10);
    const { name, duration, calories } = req.body;
    try {
        const conn = yield database_1.default;
        //getting workout from database
        const [checkResult] = yield conn.execute('SELECT * FROM workouts WHERE id = ?', [workoutId]);
        if (Array.isArray(checkResult) && checkResult.length > 0) {
            const [updateResult] = yield conn.execute(
            //updating workout once selected
            'UPDATE workouts SET name = ?, duration = ?, calories = ? WHERE id = ?', [name, duration, calories, workoutId]);
            if (updateResult.affectedRows > 0) {
                res.json({ message: 'Workout updated successfully' });
            }
            else {
                res.status(500).json({ error: 'Failed to update workout' });
            }
        }
        else {
            res.status(404).json({ error: 'Workout not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateWorkout = updateWorkout;
//to find a specific workout
const readWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workoutId = parseInt(req.params.id, 10);
    try {
        const conn = yield database_1.default;
        //select specific workout from data bases based on id
        const [result] = yield conn.execute('SELECT * FROM workouts WHERE id = ?', [workoutId]);
        if (Array.isArray(result) && result.length > 0) {
            const workout = result[0];
            res.json(workout);
        }
        else {
            res.status(404).json({ error: 'Workout not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.readWorkout = readWorkout;
