import "./App.css";
import { useState } from "react";
import WordSearch from "./components/WordSearch";
import WordAdd from "./components/WordAdd";

function App() {
  const [sivu, setSivu] = useState("haku");

  return (
    <div>
      <h1>Suomi–englanti sanakirja</h1>

      <nav>
        <button onClick={() => setSivu("haku")}>
          Hae sanoja
        </button>

        <button onClick={() => setSivu("lisays")}>
          Lisää sanoja
        </button>
      </nav>

      {sivu === "haku" && <WordSearch />}
      {sivu === "lisays" && <WordAdd />}
    </div>
  );
}

export default App;
