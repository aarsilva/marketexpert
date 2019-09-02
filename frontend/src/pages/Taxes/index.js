import React, { useState, useEffect } from "react";
import Api from "../../services/api";

import { Row, Col, Button } from "reactstrap";
import { Container } from "./styles";

import Breadcumb from "../../components/Breadcumb";
import Table from "../../components/Table";

export default function Taxes({ history }) {
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
      text: "Listagem de Impostos"
    }
  ];

  const tHeaders = [
    {
      title: "Nome",
      name: "name"
    },
    {
      title: "Percentual",
      name: "perc",
      formatter: e => `${e * 100}%`
    }
  ];

  const [tBody, setTBody] = useState([]);

  const fetchData = async function() {
    try {
      const { data: res } = await Api.get("/api/taxes");

      if (res.status) {
        setTBody(res.data);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Some error ocurred. ", error);
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
            onClick={() => history.push("/cadastros/impostos/novo")}
          >
            Novo
          </Button>
        </Col>
      </Row>
      <Table headers={tHeaders} items={tBody} action={false} />
    </Container>
  );
}
