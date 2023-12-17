"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const getProcessingTimeInMS = (time) => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`;
};
function logger(req, res, next) {
    const id = (0, uuid_1.v4)();
    const now = new Date();
    const timestamp = [now.getFullYear(), '-', now.getMonth() + 1, '-', now.getDate(), ' ', now.getHours(),
        ':', now.getMinutes(), ':', now.getSeconds()
    ].join('');
    const { method, url } = req;
    const start = process.hrtime();
    const startText = `START:${getProcessingTimeInMS(start)}`;
    const idText = `[${id}]`;
    const timeStampText = `[${timestamp}]`;
    console.log(`${idText}${timeStampText} ${method}:${url} ${startText}`);
    res.once('Finish', () => {
        const end = process.hrtime(start);
        const endText = `END:${getProcessingTimeInMS(end)}`;
        console.log(`${idText}${timeStampText} ${method}:${url} ${res.statusCode} ${endText}`);
    });
    next();
}
exports.default = logger;
;
