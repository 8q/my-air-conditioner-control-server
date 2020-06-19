import path from "path"
import fs from "fs"
import { execSync } from "child_process"

export function getSignal(sw: Switch, mode: Mode = "nothing"): Signal | null {
    if (sw === "nothing")
        return null
    else if (sw === "off")
        return fs.readFileSync(path.resolve(__dirname, "../signals/Off.txt")).toString()
    else if (sw === "on") {
        if (mode === "nothing")
            return null
        else if (mode === "cool")
            return fs.readFileSync(path.resolve(__dirname, "../signals/28C_Auto_On.txt")).toString()
        else if (mode === "heat")
            return fs.readFileSync(path.resolve(__dirname, "../signals/22H_Auto_On.txt")).toString()
    }
    return null
}

export function sendSignalToIRController(signal: Signal): void {
    execSync(`bto_advanced_USBIR_cmd -d ${signal}`)
    // console.log(`bto_advanced_USBIR_cmd -d ${signal}`)
}
