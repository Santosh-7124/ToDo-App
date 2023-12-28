import axios from "axios";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import baseURL from "../utils/constant";

const Popup = ({ setShowPopup, popupContent, setupdateUI }) => {
  const [input, setInput] = useState(popupContent.text);
  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setupdateUI((prevState) => !prevState);
        setShowPopup(false);
      });
  };
  return (
    <div className="backdrop">
      <div className="popup">
        <IoMdCloseCircle
          className="cross"
          onClick={() => {
            setShowPopup(false);
          }}
        />
        <h1>Update ToDo</h1>

        <div className="popup__input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update ToDo . . ."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateToDo();
              }
            }}
          />
          <button onClick={updateToDo}> Update</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
