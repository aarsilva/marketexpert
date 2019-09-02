import React, { useState } from "react";
import Api from "../../../services/api";

import {
  Row,
  Col,
  Card,
  Form as BForm,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { Container } from "./styles";

import Breadcumb from "../../../components/Breadcumb";

export default function Form({ history }) {
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
      url: "/cadastros/impostos",
      text: "Listagem de Impostos"
    },
    {
      text: "Novo Imposto"
    }
  ];

  const [name, setName] = useState("");
  const [perc, setPerc] = useState(0);

  const handleSave = async function() {
    try {
      if (name !== "" && perc > 0) {
        const tax = new FormData();
        tax.append("name", name);
        tax.append("perc", perc);

        const { data } = await Api.post("/api/taxes", tax, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (data.status) {
          alert(data.message);
          history.push("/cadastros/impostos");
        } else {
          alert("Não foi possível salvar o Imposto.");
          console.log("Erro ao tentar salvar: ", data);
        }
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    } catch (error) {
      if (typeof error.response !== "undefined") {
        alert("Houve um erro ao tentar salvar o Imposto.");
        console.log("Erro ao tentar salvar. ", error.response);
      } else {
        alert(
          "Houve um erro em nossos servidores. Por favor, tente novamente mais tarde."
        );
        console.log("Erro no servidor. ", error);
      }
    }
  };

  return (
    <Container fluid>
      <Breadcumb list={breadList} />
      <Row form className="justify-content-center">
        <Col sm="12" lg={8}>
          <Card body>
            <BForm>
              <FormGroup>
                <Label for="fieldname" xs={12}>
                  Nome:
                </Label>
                <Col xs="8">
                  <Input
                    type="text"
                    name="fieldname"
                    id="fieldname"
                    placeholder="Ex.: ICMS"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="fieldPerc" xs={12}>
                  Percentual:
                </Label>
                <Col xs="8">
                  <Input
                    type="number"
                    name="fieldPerc"
                    id="fieldPerc"
                    placeholder="Ex.: 12.5"
                    step="0.01"
                    min="0"
                    value={perc}
                    onChange={e => setPerc(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col lg={{ size: 2, offset: 10 }}>
                  <Button color="primary" onClick={handleSave}>
                    Salvar
                  </Button>
                </Col>
              </FormGroup>
            </BForm>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
