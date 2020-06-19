"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
function getSignal(sw, mode = "nothing") {
    if (sw === "nothing")
        return null;
    else if (sw === "off")
        return fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../signals/Off.txt")).toString();
    else if (sw === "on") {
        if (mode === "nothing")
            return null;
        else if (mode === "cool")
            return fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../signals/28C_Auto_On.txt")).toString();
        else if (mode === "heat")
            return fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../signals/22H_Auto_On.txt")).toString();
    }
    return null;
}
exports.getSignal = getSignal;
function sendSignalToIRController(signal) {
    child_process_1.execSync(`bto_advanced_USBIR_cmd -d ${signal}`);
    // console.log(`bto_advanced_USBIR_cmd -d ${signal}`)
}
exports.sendSignalToIRController = sendSignalToIRController;
