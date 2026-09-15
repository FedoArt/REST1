const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/sanakirja/:sana", (req, res) => {
    const haettavaSana = req.params.sana.toLowerCase();

    const data = fs.readFileSync("sanakirja.txt", "utf8");

    const rivit = data.split(/\r?\n/);

    for (const rivi of rivit) {
        if (rivi.trim() === "") {
            continue;
        }

        const sanat = rivi.trim().split(/\s+/);

        const suomi = sanat[0];
        const englanti = sanat[1];

        if (suomi.toLowerCase() === haettavaSana) {
            return res.json({
                suomi: suomi,
                englanti: englanti
            });
        }
    }

    res.status(404).json({
        message: "Sanaa ei löytynyt"
    });
});

app.post("/sanakirja", (req, res) => {
    const suomi = req.body.suomi;
    const englanti = req.body.englanti;

    if (!suomi || !englanti) {
        return res.status(400).json({
            message: "Anna sekä suomenkielinen että englanninkielinen sana"
        });
    }

    const uusiRivi = `${suomi} ${englanti}\n`;

    fs.writeFileSync("sanakirja.txt", uusiRivi, {
        flag: "a",
        encoding: "utf8"
    });

    res.status(201).json({
        message: "Sana lisätty",
        suomi: suomi,
        englanti: englanti
    });
});

app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});