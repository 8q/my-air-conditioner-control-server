export function guessMode(rawString: string | null): Mode {
    if (rawString == null) return "nothing"

    const lowerString = rawString.toLowerCase()
    if (lowerString === "cool" || lowerString === "c") {
        return "cool"
    } else if (lowerString === "heat" || lowerString === "h") {
        return "heat"
    }

    return "nothing"
}

export function guessSwitch(rawString: string | null): Switch {
    if (rawString == null) return "nothing"

    const lowerString = rawString.toLowerCase()
    if (lowerString === "on") {
        return "on"
    } else if (lowerString === "off") {
        return "off"
    }

    return "nothing"
}
