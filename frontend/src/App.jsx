import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import baseURL from "./utils/constant";
import Popup from "./components/popUp";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setupdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        console.log(res.data);
        setToDos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setupdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">ToDo App</h1>
        <div className="input_holder">
          <input
            value={input}
            name="input-field"
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo . . ."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveToDo();
              }
            }}
          />
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setupdateUI={setupdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setupdateUI={setupdateUI}
        />
      )}
    </main>
  );
};

export default App;
