import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Item from "./Item";
import "./styles.scss";
import LoadingTable from "../Loading/Table";

const DataTable = ({
  headItems,
  items,
  tableProps = { striped: false, bordered: true, hover: true },
  actionItems,
  isLoading,
}) => {
  if (!items || isLoading) {
    return <LoadingTable />;
  }

  return (
    <div className="data-table-container">
      <Table {...tableProps} className="data-table">
        <thead>
          <tr>
            {headItems.map((item) => (
              <th key={item} className="table-header">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={headItems.length} className="text-center no-data">
                No data available
              </td>
            </tr>
          )}

          {items.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <Item data={item} />

              {actionItems && (
                <td className="table-actions">
                  <div className="action-buttons">
                    {actionItems.map((action, idx) => (
                      <OverlayTrigger
                        key={idx}
                        overlay={<Tooltip>{action.tooltip}</Tooltip>}
                        placement="top"
                      >
                        <Button
                          type="button"
                          variant={action.variant}
                          onClick={() => action.onClick(item)}
                          className="action-button"
                        >
                          {action.text}
                        </Button>
                      </OverlayTrigger>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
