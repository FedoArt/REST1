
import { useState } from "react";

function WordSearch() {
  const [sana, setSana] = useState("");
  const [tulos, setTulos] = useState("");
  const [virhe, setVirhe] = useState("");

  async function haeSana(event) {
    event.preventDefault();

    setTulos("");
    setVirhe("");

    if (!sana.trim()) {
      setVirhe("Kirjoita ensin suomenkielinen sana.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/sanakirja/${encodeURIComponent(sana.trim())}`
      );

      if (!response.ok) {
        throw new Error("Sanaa ei löytynyt.");
      }

      const data = await response.json();
      setTulos(data.englanti);
    } catch (error) {
      setVirhe(error.message);
    }
  }

  return (
    <div>
      <h2>Hae sana</h2>

      <form onSubmit={haeSana}>
        <input
          type="text"
          placeholder="Kirjoita suomenkielinen sana"
          value={sana}
          onChange={(event) => setSana(event.target.value)}
        />

        <button type="submit">Hae</button>
      </form>

      {tulos && <p>Englanniksi: {tulos}</p>}
      {virhe && <p>{virhe}</p>}
    </div>
  );
}

export default WordSearch;
