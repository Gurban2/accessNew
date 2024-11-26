import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addPersona} from "../../../../store/reducers/pngReducer";
// import "./Add.scss";

const PersonaAdd = () => {

  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const personas = useSelector((state) => state.personas.list || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (inputValue.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }

    const isExisting = personas.some(
      (persona) => persona.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (isExisting) {
      alert("This name already exists!");
    } else {
      dispatch(
        addPersona({
          id: Date.now(),
          name: inputValue.trim(),
        })
      );
      setInputValue("");
    }
  };

  return (
    <div className="persona-add-container">
      <h1 className="persona-add-title">Add Persona</h1>
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name to add"
          className="search-input"
        />
        <button onClick={handleAdd} className="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  );
};

export default PersonaAdd;
