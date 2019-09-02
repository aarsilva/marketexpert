import React, { useState, useEffect } from "react";
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
      url: "/cadastros/categorias",
      text: "Listagem de Categorias"
    },
    {
      text: "Nova Categoria"
    }
  ];

  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
  const [taxList, setTaxList] = useState([]);

  const fetchTaxList = async function() {
    try {
      const { data: res } = await Api.get("/api/taxes");

      if (res.status) {
        setTaxList(res.data);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Some error ocurred. ", error);
    }
  };

  const handleSave = async function() {
    try {
      if (name !== "" && tax !== "") {
        const category = new FormData();
        category.append("name", name);
        category.append("tax", tax);

        const { data: res } = await Api.post("/api/categories", category, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (res.status) {
          alert(res.message);
          history.push("/cadastros/categorias");
        }
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    } catch (error) {
      if (typeof error.response !== "undefined") {
        alert("Houve um erro ao tentar salvar a Categoria.");
        console.log("Erro ao tentar salvar. ", error.response);
      } else {
        alert(
          "Houve um erro em nossos servidores. Por favor, tente novamente mais tarde."
        );
        console.log("Erro no servidor. ", error);
      }
    }
  };

  useEffect(() => {
    fetchTaxList();
    return () => {
      setTaxList([]);
    };
  }, []);

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
                    placeholder="Ex.: Cartela de Medicamento"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="fieldTax" xs={12}>
                  Imposto:
                </Label>
                <Col xs="8">
                  <Input
                    type="select"
                    name="fieldTax"
                    id="fieldTax"
                    value={tax}
                    onChange={e => setTax(e.target.value)}
                  >
                    <option value="">Selecionar um Imposto</option>
                    {taxList.map((value, key) => (
                      <option key={key} value={value.id}>
                        {value.name} - {value.perc * 100}%
                      </option>
                    ))}
                  </Input>
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
