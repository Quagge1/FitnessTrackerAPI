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
exports.getWorkout = exports.createWorkout = void 0;
const database_1 = __importDefault(require("../models/database"));
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, duration, calories } = req.body;
    try {
        const result = yield database_1.default.then((conn) => conn.query('INSERT INTO workouts (name, duration, calories) VALUES (?, ?, ?)', [
            name,
            duration,
            calories,
        ]));
        const insertId = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.insertId;
        res.json({ id: insertId, name, duration, calories });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createWorkout = createWorkout;
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.then((conn) => conn.query('SELECT * FROM workouts'));
        if (Array.isArray(result[0])) {
            const workouts = result[0];
            res.json(workouts);
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getWorkout = getWorkout;
