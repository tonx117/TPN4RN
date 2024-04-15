import React, { useState, useRef } from "react";
import "./App.css";
import Canvas from "./canvas";
import { lineSpinner } from "ldrs";

lineSpinner.register();

function App() {
  const songUrl = "/starwarssong.mp3"; // Ruta al archivo de audio para la canción de fondo
  const deleteSoundUrl = "/Yodadeath.mp3"; // Ruta al archivo de audio a reproducir al eliminar

  const audioRef = useRef(null); // Referencia para la canción de fondo
  const deleteAudioRef = useRef(null); // Referencia para el sonido al eliminar

  const [people, setPeople] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setPeople(data.results.map((person) => ({ ...person, isHidden: false })));
      setShowList(true);
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error al reproducir el audio:", error);
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "An error occurred while fetching data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveOrHide = (index) => {
    setPeople((prevPeople) => {
      const updatedPeople = [...prevPeople];
      updatedPeople[index].isHidden = true;
      return updatedPeople;
    });

    // Reproduce el sonido de eliminación
    if (deleteAudioRef.current) {
      deleteAudioRef.current.play().catch((error) => {
        console.error("Error al reproducir el audio de eliminación:", error);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Elemento de audio para la canción de fondo */}
        <audio ref={audioRef} src={songUrl} loop>
          Tu navegador no soporta el elemento de audio.
        </audio>

        {/* Elemento de audio para el sonido de eliminación */}
        <audio ref={deleteAudioRef} src={deleteSoundUrl}>
          Tu navegador no soporta el elemento de audio.
        </audio>

        <Canvas style={{ pointerEvents: "none" }} />

        <h1>Star Wars Characters</h1>

        <button className="Button" onClick={fetchData}>
          Traer
        </button>

        {isLoading && (
          <div className="loading-spinner-container">
            <l-line-spinner size="40" stroke="3" speed="1" color="White" />
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {showList && (
          <ul style={{ listStyleType: "none" }}>
            {" "}
            {/* Oculta los puntos de la lista */}
            {people.map((person, index) => (
              <div className="Div" key={index}>
                {!person.isHidden && (
                  <li key={index}>
                    {person.name}
                    <button
                      className="Button"
                      onClick={() => handleRemoveOrHide(index)}
                    >
                      Eliminar
                    </button>
                  </li>
                )}
              </div>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
