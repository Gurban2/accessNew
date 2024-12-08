import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { Form } from "react-bootstrap";

const Search = ({ path, placeholder, text }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const debounceValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debounceValue) {
      navigate(`${path}?keyword=${debounceValue}`, {
        replace: true,
      });
    } else {
      navigate(path, { replace: true });
    }
  }, [debounceValue, navigate, path]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <Form>
      <Form.Group controlId="searchVisitor">
        <Form.Label>{text}</Form.Label>
        <Form.Control
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
