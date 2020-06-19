import express from "express"
import { getSignal, sendSignalToIRController } from "./signal"
import { guessSwitch, guessMode } from "./guess"

export const router = express.Router()

router.post("/control", (req, res) => {
    const sw = guessSwitch(req.body.switch)

    if (sw === "nothing") {

        res.status(400).json({ error: "invalid or missing parameters" })
        return

    } else if (sw === "off") {

        sendSignalToIRController(getSignal(sw)!)
        res.status(200).json({ msg: "switch off" })
        return

    } else if (sw === "on") {
        const mode = guessMode(req.body.mode)

        if (mode === "nothing") {

            res.status(400).json({ error: "invalid or missing parameters" })
            return

        } else if (mode === "cool" || mode === "heat") {

            sendSignalToIRController(getSignal(sw, mode)!)
            res.status(200).json({ msg: `switch on, ${mode}` })
            return

        }
    }

    res.status(400).json({ error: "invalid or missing parameters" })
})
