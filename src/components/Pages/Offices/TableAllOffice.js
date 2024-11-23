import React from "react";
import Table from "react-bootstrap/Table";

function TableAllOffice({ offices }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {offices.map((office, index) => (
          <tr key={office.id}>
            <td>{index + 1}</td>
            <td>{office.firstName}</td>
            <td>{office.lastName}</td>
            <td>{office.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableAllOffice;
