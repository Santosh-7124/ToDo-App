import axios from "axios";
import React from "react";
import { FaCross, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import baseURL from "../utils/constant";

const ToDo = ({ text, id, setupdateUI, setShowPopup, setPopupContent }) => {
  const deleteToDo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setupdateUI((prevState) => !prevState);
    });
  };

  const updateTodo = () => {
    setPopupContent({text, id});
    setShowPopup(true);
  };

  return (
    <div className="toDo">
      {text}
      <div className="icons">
        <FaEdit className="icon" onClick={updateTodo} />
        <MdDelete className="icon" onClick={deleteToDo} />
      </div>
    </div>
  );
};

export default ToDo;
