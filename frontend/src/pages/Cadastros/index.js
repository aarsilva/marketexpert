import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody } from "reactstrap";

import { Container, Row, CardText } from "./styles";
import { ReactComponent as ProductIcon } from "../../assets/images/groceries.svg";
import { ReactComponent as CategoryIcon } from "../../assets/images/description.svg";
import { ReactComponent as TaxIcon } from "../../assets/images/currency.svg";

export default function Cadastros() {
  const handleClick = () => {};

  return (
    <Container fluid={true}>
      <Row>
        <Col md="4" lg="3" xl="2">
          <Link to="/cadastros/produtos">
            <Card className="d-xl-inline-flex ml-auto">
              <CardBody className="text-center">
                <ProductIcon width={50} height={50} />
                <CardText>Produtos</CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col md="3" lg="2">
          <Link to="/cadastros/categorias">
            <Card className="d-xl-inline-flex">
              <CardBody className="text-center">
                <CategoryIcon width={50} height={50} />
                <CardText>Categorias</CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col md="3" lg="2">
          <Link to="/cadastros/impostos">
            <Card className="d-xl-inline-flex">
              <CardBody className="text-center">
                <TaxIcon width={50} height={50} />
                <CardText>Impostos</CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
