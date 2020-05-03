import express from "express"
import path from "path"
import fs from "fs"
import { execSync } from "child_process"

type Switch = "on" | "off" | "nothing"
type Mode = "cool" | "heat" | "nothing"
type Signal = string

function guessMode(rawString: string | null): Mode {
    if (rawString == null) return "nothing"

    const lowerString = rawString.toLowerCase()
    if (lowerString === "cool" || lowerString === "c") {
        return "cool"
    } else if(lowerString === "heat" || lowerString === "h") {
        return "heat"
    }

    return "nothing"
}

function guessSwitch(rawString: string | null): Switch {
    if (rawString == null) return "nothing"

    const lowerString = rawString.toLowerCase()
    if (lowerString === "on") {
        return "on"
    } else if(lowerString === "off") {
        return "off"
    }

    return "nothing"
}

function getSignal(sw: Switch, mode: Mode = "nothing"): Signal | null {
    if(sw === "nothing")
        return null;
    else if(sw === "off")
        return fs.readFileSync(path.resolve(__dirname, "../signals/Off.txt")).toString()
    else if(sw === "on") {
        if (mode === "nothing")
            return null;
        else if (mode === "cool")
            return fs.readFileSync(path.resolve(__dirname, "../signals/28C_Auto_On.txt")).toString()
        else if (mode === "heat")
            return fs.readFileSync(path.resolve(__dirname, "../signals/22H_Auto_On.txt")).toString()
    }
    return null;
}

function sendSignalToIRController(signal: Signal): void {
    execSync(`bto_advanced_USBIR_cmd -d ${signal}`)
    // console.log(`bto_advanced_USBIR_cmd -d ${signal}`)
}

const app = express()
app.use(express.json())

app.get("/control", (req, res) => {
    const sw = guessSwitch(req.body.switch)

    if (sw === "nothing") {

        res.status(400).json({ error: "invalid or missing parameters" })
        return

    } else if (sw === "off") {

        sendSignalToIRController(getSignal(sw)!)
        res.status(200).json({ msg: "switch off" })
        return

    } else if(sw === "on") {
        const mode = guessMode(req.body.mode)

        if (mode === "nothing") {

            res.status(400).json({ error: "invalid or missing parameters" })
            return

        } else if(mode === "cool" || mode === "heat") {

            sendSignalToIRController(getSignal(sw, mode)!)
            res.status(200).json({ msg: `switch on, ${mode}` })
            return

        }
    }

    res.status(400).json({ error: "invalid or missing parameters" })
})

app.listen(3000)