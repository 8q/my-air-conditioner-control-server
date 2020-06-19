"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signal_1 = require("./signal");
const guess_1 = require("./guess");
exports.router = express_1.default.Router();
exports.router.post("/control", (req, res) => {
    const sw = guess_1.guessSwitch(req.body.switch);
    if (sw === "nothing") {
        res.status(400).json({ error: "invalid or missing parameters" });
        return;
    }
    else if (sw === "off") {
        signal_1.sendSignalToIRController(signal_1.getSignal(sw));
        res.status(200).json({ msg: "switch off" });
        return;
    }
    else if (sw === "on") {
        const mode = guess_1.guessMode(req.body.mode);
        if (mode === "nothing") {
            res.status(400).json({ error: "invalid or missing parameters" });
            return;
        }
        else if (mode === "cool" || mode === "heat") {
            signal_1.sendSignalToIRController(signal_1.getSignal(sw, mode));
            res.status(200).json({ msg: `switch on, ${mode}` });
            return;
        }
    }
    res.status(400).json({ error: "invalid or missing parameters" });
});
