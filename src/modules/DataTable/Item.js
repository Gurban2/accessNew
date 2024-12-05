import React from "react";

const Item = ({ data }) => {
  return Object.values(data).map((item, index) => (
    <td key={index}>
      <div className="data-table-item">{item}</div>
    </td>
  ));
};

export default Item;
