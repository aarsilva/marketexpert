import React from "react";

import { Container, ListGroup, ListGroupItem } from "./styles";

const List = ({ items }) => (
  <Container>
    <ListGroup>
      {items.map((value, key) => (
        <ListGroupItem key={key}>
          <p>
            <strog>EAN: </strog> {value.ean}
          </p>
          <p>
            <strong>Produto: </strong> {value.name}
          </p>
        </ListGroupItem>
      ))}
    </ListGroup>
  </Container>
);

export default List;
