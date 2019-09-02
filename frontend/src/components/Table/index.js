import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md/index";

import { Row, Col, Table as BTable, Button } from "reactstrap";
// import { Container } from './styles';

const Table = ({ history, items, headers, size = 10, action = true }) => (
  <Row>
    <Col
      xs="12"
      lg={{
        size: typeof size !== "undefined" ? size : 10,
        offset: typeof size !== "undefined" ? Math.round((12 - size) / 2) : 1
      }}
    >
      <BTable>
        <thead>
          <tr>
            {headers.map((value, key) => {
              return <th key={key}>{value.title}</th>;
            })}
            {action ? (
              <th colSpan="2" className="text-center">
                Ações
              </th>
            ) : (
              false
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((value, key) => {
            return (
              <tr key={key}>
                {headers.map((header, index) => {
                  return (
                    <td key={key + "_" + index}>
                      {typeof header.formatter !== "undefined"
                        ? header.formatter(value[header.name])
                        : value[header.name]}
                    </td>
                  );
                })}
                {action ? (
                  <>
                    <td width="30">
                      <Button outline color="primary" size="sm">
                        <MdEdit size="14" />
                      </Button>
                    </td>
                    <td width="30">
                      <Button outline color="danger" size="sm">
                        <MdDeleteForever size="14" />
                      </Button>
                    </td>
                  </>
                ) : (
                  false
                )}
              </tr>
            );
          })}
        </tbody>
      </BTable>
    </Col>
  </Row>
);

export default Table;
