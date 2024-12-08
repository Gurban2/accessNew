import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Item from "./Item";
import "./styles.scss";
import LoadingTable from "../Loading/Table";

const DataTable = ({
  headItems,
  items,
  tableProps = { striped: true, bordered: true, hover: true },
  actionItems,
  isLoading,
}) => {
  if (!items || isLoading) {
    return <LoadingTable />;
  }

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
        {items.length === 0 && (
          <tr>
            <td colSpan={headItems.length} className="text-center">
              No data available
            </td>
          </tr>
        )}

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
