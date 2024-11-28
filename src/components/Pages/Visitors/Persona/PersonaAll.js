import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePersona } from "../../../../store/reducers/pngReducer";
import Table from "react-bootstrap/Table";

const PersonaAll = () => {
  const personas = useSelector((state) => state.personas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Persona?")) {
      dispatch(deletePersona({ id }));
    }
  };

  const handleEdit = (id) => {
    navigate(`/personas/edit/${id}`);
  };

  return (
    <div className="persona-all-container">
      <h1 className="persona-all-title">all Personas</h1>
      {personas && personas.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((persona, index) => (
                <tr key={persona.id}>
                  <td>{index + 1}</td>
                  <td>{persona.name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(persona.id)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(persona.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button
            onClick={() => navigate("/persona/add")}
            className="btn btn-primary"
          >
            add Persona
          </button>
        </>
      ) : (
        <p className="no-personas">No personas available.</p>
      )}
    </div>
  );
};

export default PersonaAll;
