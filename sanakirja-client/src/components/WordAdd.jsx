
import { useState } from "react";

function WordAdd() {
  const [suomi, setSuomi] = useState("");
  const [englanti, setEnglanti] = useState("");
  const [viesti, setViesti] = useState("");

  async function lisaaSana(event) {
    event.preventDefault();
    setViesti("");

    if (!suomi.trim() || !englanti.trim()) {
      setViesti("Täytä molemmat kentät.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/sanakirja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          suomi: suomi.trim(),
          englanti: englanti.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Sanan lisääminen epäonnistui.");
      }

      setViesti("Sana lisätty onnistuneesti!");
      setSuomi("");
      setEnglanti("");
    } catch (error) {
      setViesti(error.message);
    }
  }

  return (
    <div>
      <h2>Lisää uusi sana</h2>

      <form onSubmit={lisaaSana}>
        <input
          type="text"
          placeholder="Suomenkielinen sana"
          value={suomi}
          onChange={(event) => setSuomi(event.target.value)}
        />

        <input
          type="text"
          placeholder="Englanninkielinen sana"
          value={englanti}
          onChange={(event) => setEnglanti(event.target.value)}
        />

        <button type="submit">Lisää sana</button>
      </form>

      <p>{viesti}</p>
    </div>
  );
}

export default WordAdd;
