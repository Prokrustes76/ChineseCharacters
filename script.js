let stapel = []
let modus = 1

function start(m) {
    modus = m

    stapel = [...zeichenListe]

    // Zufällige Reihenfolge
    stapel.sort(() => Math.random() - 0.5)

    document.getElementById("setup").classList.add("hidden")
    document.getElementById("trainer").classList.remove("hidden")

    nextCard()
}

function nextCard() {
    // Fertig?
    if (stapel.length === 0) {
        document.getElementById("trainer").classList.add("hidden")
        document.getElementById("finished").classList.remove("hidden")
        return
    }

    const e = stapel[0]

    // Anzeige aktualisieren
    document.getElementById("counter").textContent =
        "Noch zu schaffen: " + stapel.length

    // Lösung ausblenden
    document.getElementById("answerPanel").classList.add("hidden")
    document.getElementById("buttons").classList.add("hidden")

    // "Lösung anzeigen"-Button einblenden
    document.getElementById("showBtn").classList.remove("hidden")

    // Frage anzeigen
    document.getElementById("card").innerHTML =
        modus === 1
            ? e.chinesisch
            : e.pinyin + "<br><br>" + e.deutsch
}

function showAnswer() {
    const e = stapel[0]

    // Lösung einblenden
    document.getElementById("answerPanel").classList.remove("hidden")
    document.getElementById("buttons").classList.remove("hidden")

    // "Lösung anzeigen"-Button ausblenden
    document.getElementById("showBtn").classList.add("hidden")

    // Lösung anzeigen
    document.getElementById("answer").innerHTML =
        modus === 1
            ? e.pinyin + "<br><br>" + e.deutsch
            : e.chinesisch
}

function answerKnown(known) {
    // Aktuelle Karte vom Stapel nehmen
    const e = stapel.shift()

    // Nicht gewusst?
    if (!known) {
        // Karte 5–10 Plätze nach hinten schieben
        const pos = Math.min(
            Math.floor(Math.random() * 6) + 5,
            stapel.length
        )

        stapel.splice(pos, 0, e)
    }

    nextCard()
}
