"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
//database connection class
const connection = (0, promise_1.createConnection)({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'workouts',
    port: 3306
});
exports.default = connection;
