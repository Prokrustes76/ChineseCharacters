let stapel = []
let modus = 1
let aufgedeckt = false

const card = document.getElementById("card")
const instruction = document.getElementById("instruction")
const buttons = document.getElementById("buttons")
const counter = document.getElementById("counter")

function start(m) {
    modus = m
    stapel = [...zeichenListe]
    stapel.sort(() => Math.random() - 0.5)
    document.getElementById("setup").classList.add("hidden")
    document.getElementById("trainer").classList.remove("hidden")
    zeigeKarte()
}

function zeigeKarte() {
    if (stapel.length === 0) {
        document.getElementById("trainer").classList.add("hidden")
        document.getElementById("finished").classList.remove("hidden")
        return
    }

    aufgedeckt = false
    const e = stapel[0]
    counter.textContent = "Noch zu schaffen: " + stapel.length

    card.innerHTML = modus === 1
        ? e.chinesisch
        : `${e.pinyin}<br><br>${e.deutsch}`

    instruction.textContent = "Space drücken"
    buttons.classList.add("hidden")
}

document.addEventListener("keydown", e => {
    if (e.code !== "Space") return

    e.preventDefault()

    if (stapel.length === 0 || aufgedeckt) return

    aufgedeckt = true
    const z = stapel[0]

    card.innerHTML = modus === 1
        ? `${z.chinesisch}<br><br>${z.pinyin}<br>${z.deutsch}`
        : `${z.pinyin}<br>${z.deutsch}<br><br>${z.chinesisch}`

    instruction.textContent = "Gewusst?"
    buttons.classList.remove("hidden")
})

function answer(gewusst) {
    const eintrag = stapel.shift()

    if (!gewusst) {
        const position = Math.min(
            Math.floor(Math.random() * 6) + 5,
            stapel.length
        )

        stapel.splice(position, 0, eintrag)
    }

    zeigeKarte()
}
