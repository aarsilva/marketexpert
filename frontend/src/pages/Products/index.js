import React, { useState, useEffect } from "react";
import Api from "../../services/api";

import { Row, Col, Button } from "reactstrap";
import { Container } from "./styles";

import Breadcumb from "../../components/Breadcumb";
import Table from "../../components/Table";

export default function Clientes({ history }) {
  const breadList = [
    {
      url: "/home",
      text: "Início"
    },
    {
      url: "/cadastros",
      text: "Cadastros"
    },
    {
      text: "Listagem de Produtos"
    }
  ];

  const tHeaders = [
    {
      title: "EAN",
      name: "ean"
    },
    {
      title: "Nome",
      name: "name"
    },
    {
      title: "Categoria",
      name: "category"
    },
    {
      title: "Valor(R$)",
      name: "price",
      formatter: e => {
        const formatted = e.replace(".", ",");

        return `R$ ${formatted}`;
      }
    }
  ];

  const [tBody, setTBody] = useState([]);

  const fetchData = async function() {
    try {
      const { data } = await Api.get("/api/products");

      if (data.status) {
        setTBody(data.data);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setTBody([]);
    };
  }, []);

  return (
    <Container fluid>
      <Breadcumb list={breadList} />
      <Row className="justify-content-end pt-2 pb-4">
        <Col lg="1">
          <Button
            color="primary"
            onClick={() => history.push("/cadastros/produtos/novo")}
          >
            Novo
          </Button>
        </Col>
      </Row>
      <Table headers={tHeaders} items={tBody} action={false} />
    </Container>
  );
}
