import React from "react";
import { Row, Col, CardBody, CardTitle } from "reactstrap";

import { Container, Card, CardText } from "./styles";

export default function Home() {
  return (
    <Container fluid={true}>
      <Row>
        <Col xs="12" sm="6" md="4" lg="3"></Col>
      </Row>
    </Container>
  );
}
