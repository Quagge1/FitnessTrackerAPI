"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//main driver class for the application
const express_1 = __importDefault(require("express"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(middleware_1.default);
app.use(workoutRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
