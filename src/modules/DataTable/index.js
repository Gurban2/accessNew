import React from "react";
import Table from "react-bootstrap/Table";
import Item from "./Item";
import { Button } from "react-bootstrap";
import "./styles.scss";

const DataTable = ({ headItems, items, tableProps, actionItems }) => {
  return (
    <Table {...tableProps} className="data-table">
      <thead>
        <tr>
          {headItems.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <Item data={item} />

            {actionItems && (
              <td>
                <div className="data-table-actions">
                  {actionItems.map((action, index) => (
                    <Button
                      type="button"
                      variant={action.variant}
                      key={index}
                      onClick={() => action.onClick(item.id)}
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
