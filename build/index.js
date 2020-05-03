"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
function guessMode(rawString) {
    if (rawString == null)
        return "nothing";
    var lowerString = rawString.toLowerCase();
    if (lowerString === "cool" || lowerString === "c") {
        return "cool";
    }
    else if (lowerString === "heat" || lowerString === "h") {
        return "heat";
    }
    return "nothing";
}
function guessSwitch(rawString) {
    if (rawString == null)
        return "nothing";
    var lowerString = rawString.toLowerCase();
    if (lowerString === "on") {
        return "on";
    }
    else if (lowerString === "off") {
        return "off";
    }
    return "nothing";
}
function getSignal(sw, mode) {
    if (mode === void 0) { mode = "nothing"; }
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
function sendSignalToIRController(signal) {
    child_process_1.execSync("bto_advanced_USBIR_cmd -d " + signal);
    // console.log(`bto_advanced_USBIR_cmd -d ${signal}`)
}
var app = express_1.default();
app.use(express_1.default.json());
app.post("/control", function (req, res) {
    var sw = guessSwitch(req.body.switch);
    if (sw === "nothing") {
        res.status(400).json({ error: "invalid or missing parameters" });
        return;
    }
    else if (sw === "off") {
        sendSignalToIRController(getSignal(sw));
        res.status(200).json({ msg: "switch off" });
        return;
    }
    else if (sw === "on") {
        var mode = guessMode(req.body.mode);
        if (mode === "nothing") {
            res.status(400).json({ error: "invalid or missing parameters" });
            return;
        }
        else if (mode === "cool" || mode === "heat") {
            sendSignalToIRController(getSignal(sw, mode));
            res.status(200).json({ msg: "switch on, " + mode });
            return;
        }
    }
    res.status(400).json({ error: "invalid or missing parameters" });
});
app.listen(3000, function () { return console.log('my-air-conditioner-control-server'); });
