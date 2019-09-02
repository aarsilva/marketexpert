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
      url: "/cadastros/produtos",
      text: "Listagem de Produtos"
    },
    {
      text: "Novo Produto"
    }
  ];

  const [ean, setEan] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async function() {
    const { data } = await Api.get("/api/categories");

    if (data.status) {
      setCategoryList(data.data);

      return true;
    }

    return false;
  };

  const handleSave = async function() {
    try {
      if (ean !== "" && name !== "" && category !== "" && price > 0) {
        const product = new FormData();
        product.append("ean", ean);
        product.append("name", name);
        product.append("category", category);
        product.append("price", price);

        const { data: res } = await Api.post("/api/products", product, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (res.status) {
          alert(res.message);
          history.push("/cadastros/produtos");
        } else {
          alert(res.message);
          console.log(res);
        }
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    } catch (error) {
      if (typeof error.response !== "undefined") {
        alert("Houve um erro ao tentar salvar o Produto.");
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
    fetchCategoryList();
    return () => {
      setCategoryList([]);
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
                <Label for="fieldEan" xs={12}>
                  EAN:
                </Label>
                <Col xs="6">
                  <Input
                    type="tel"
                    name="fieldEan"
                    id="fieldEan"
                    placeholder="Ex.: 789546296351"
                    value={ean}
                    onChange={e => setEan(e.target.value)}
                  />
                </Col>
              </FormGroup>
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
                <Label for="fieldCategory" xs={12}>
                  Categorias:
                </Label>
                <Col xs="6">
                  <Input
                    type="select"
                    name="fieldCategory"
                    id="fieldCategory"
                    placeholder="Ex.: Categoria"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="">Selecione uma Categoria</option>
                    {categoryList.map((value, key) => {
                      return (
                        <option key={key} value={value.id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="fieldPrice" xs={12}>
                  Valor (R$):
                </Label>
                <Col xs="8">
                  <Input
                    type="number"
                    name="fieldPrice"
                    id="fieldPrice"
                    min="0"
                    step="0.01"
                    placeholder="Ex.: 12,50"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
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
