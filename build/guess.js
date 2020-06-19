"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function guessMode(rawString) {
    if (rawString == null)
        return "nothing";
    const lowerString = rawString.toLowerCase();
    if (lowerString === "cool" || lowerString === "c") {
        return "cool";
    }
    else if (lowerString === "heat" || lowerString === "h") {
        return "heat";
    }
    return "nothing";
}
exports.guessMode = guessMode;
function guessSwitch(rawString) {
    if (rawString == null)
        return "nothing";
    const lowerString = rawString.toLowerCase();
    if (lowerString === "on") {
        return "on";
    }
    else if (lowerString === "off") {
        return "off";
    }
    return "nothing";
}
exports.guessSwitch = guessSwitch;
