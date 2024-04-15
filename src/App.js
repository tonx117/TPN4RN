import React, { useState } from "react";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showList, setShowList] = useState(false); // Estado para controlar la visualización de la lista

  const fetchData = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setPeople(data.results.map((person) => ({ ...person, isHidden: false })));
      setShowList(true); // Mostrar la lista después de traer los datos
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };

  const handleRemoveOrHide = (index) => {
    setPeople((prevPeople) => {
      const updatedPeople = [...prevPeople];
      updatedPeople[index].isHidden = true;
      return updatedPeople;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars Characters</h1>
        <button className="Button" onClick={fetchData}>
          Traer
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {showList && ( // Renderizar la lista solo cuando showList es true
          <ul>
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
