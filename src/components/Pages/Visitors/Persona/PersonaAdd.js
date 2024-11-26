import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPersona } from "../../../../store/reducers/pngReducer";

const PersonaAdd = () => {
  const [inputValue, setInputValue] = useState("");
  const [matchedVisitor, setMatchedVisitor] = useState(null); // Для хранения найденного посетителя
  const dispatch = useDispatch();

  // Список всех посетителей (например, приходит из Redux или другого источника)
  const visitors = useSelector((state) => state.visitors || []); // Предположим, что visitors — это отдельный slice
  const personas = useSelector((state) => state.personas || []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Поиск соответствия в списке visitors
    const match = visitors.find(
      (visitor) => visitor.name.toLowerCase() === value.toLowerCase()
    );
    setMatchedVisitor(match || null); // Устанавливаем найденного посетителя или null
  };

  const handleAdd = () => {
    if (!matchedVisitor) {
      alert("No matching visitor found!");
      return;
    }

    // Проверка на существование в списке персон
    const isExisting = personas.some(
      (persona) =>
        persona.name.toLowerCase() === matchedVisitor.name.toLowerCase()
    );

    if (isExisting) {
      alert("This persona already exists!");
    } else {
      dispatch(
        addPersona({
          id: matchedVisitor.id,
          name: matchedVisitor.name,
        })
      );
      setInputValue("");
      setMatchedVisitor(null); // Сбросить найденного посетителя
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
          placeholder="Search for a visitor"
          className="search-input"
        />
        <button
          onClick={handleAdd}
          className="btn btn-primary"
          disabled={!matchedVisitor} // Кнопка активна только если найден посетитель
        >
          Add
        </button>
      </div>
      {/* Отображение результата поиска */}
      {matchedVisitor && (
        <div className="search-result">
          <p>Found visitor: {matchedVisitor.name}</p>
        </div>
      )}
    </div>
  );
};

export default PersonaAdd;
