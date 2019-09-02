import React, { useState, useEffect } from "react";
import Api from "../../services/api";

import {
  Button,
  Label,
  FormGroup,
  Form,
  ModalBody,
  Modal,
  Col,
  Row as BRow
} from "reactstrap";
import { Container, Row, Input } from "./styles";

import Table from "../../components/Table";

export default function Invoices({ history }) {
  const [modalStatus, setModalStatus] = useState(true);
  const [cpf, setCpf] = useState("");
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0.0);
  const [taxTotal, setTaxTotal] = useState(0.0);

  const tHeader = [
    {
      title: "EAN",
      name: "ean"
    },
    {
      title: "Produto",
      name: "name"
    },
    {
      title: "Quantidade",
      name: "quantity"
    },
    {
      title: "Valor(R$)",
      name: "price",
      formatter: e => `R$ ${e.toString().replace(".", ",")}`
    },
    {
      title: "Imposto",
      name: "tax",
      formatter: e => `R$ ${e.toString().replace(".", ",")}`
    },
    {
      title: "Total(R$)",
      name: "total",
      formatter: e => `R$ ${e.toString().replace(".", ",")}`
    }
  ];

  const modalToggle = () => {
    setModalStatus(!modalStatus);
  };

  const handleChange = e => {
    const value = e.target.value;
    const masked = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");

    setCpf(masked);
  };

  const handleFormat = e => {
    return `R$ ${e.toString().replace(".", ",")}`;
  };

  const findProduct = async function(item) {
    try {
      if (typeof item !== "undefined") {
        const { data: res } = await Api.get(`/api/products/find?ean=${item}`);

        if (res.status) {
          const { data } = res;

          return data[0];
        }
      }
      return false;
    } catch (error) {
      console.error("Some error ocurred. ", error);

      return false;
    }
  };

  const insertProduct = async function() {
    const array = [...productList];
    const item = await findProduct(product);

    if (item) {
      const taxValue = item.price * item.perc;
      const totalItem =
        (parseFloat(item.price) + parseFloat(taxValue)) * quantity;

      const objItem = {
        ...item,
        quantity,
        total: totalItem.toFixed(2),
        tax: taxValue.toFixed(2)
      };
      array.push(objItem);

      setProductList(array);
      setProduct("");
      setQuantity(0);

      return true;
    } else {
      alert(
        "Produto não encontrado. Favor conferir o EAN/Cód. de Barras informado."
      );
    }

    return false;
  };

  const chooseClient = () => {
    modalToggle();
  };

  const handleSave = async function() {
    try {
      if (productList.length > 0) {
        const confirmation = window.confirm(
          "Deseja realmente finalizar esta venda?"
        );
        if (confirmation) {
          const invoice = new FormData();
          invoice.append("products", JSON.stringify(productList));
          invoice.append("invoice", { cpf: cpf });

          const { data: res } = await Api.post("/api/invoices", invoice, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });

          if (res.status) {
            alert(res.message);
            history.push("/home");
          } else {
            alert("Não foi possível salvar a Venda.");
            console.log(res);
          }
        }
      } else {
        alert("Por favor, insira ao menos um produto.");
      }
    } catch (error) {
      if (typeof error.response !== "undefined") {
        alert("Houve um erro ao tentar salvar a Venda.");
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
    if (productList.length > 0) {
      let calcTotal = 0;
      let calcTax = 0;
      productList.map(({ quantity, tax, total }) => {
        calcTotal = calcTotal + parseFloat(total);
        calcTax = calcTax + parseFloat(tax) * quantity;
      });

      setTotal(calcTotal.toFixed(2));
      setTaxTotal(calcTax.toFixed(2));
    }
    return () => {
      setTotal(0);
    };
  }, [productList]);

  return (
    <Container fluid>
      <Modal isOpen={modalStatus} centered>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="fieldCpf">CPF</Label>
              <Input
                type="text"
                name="cpf"
                id="fieldCpf"
                value={cpf}
                placeholder="Ex: 999.999.999-99"
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
          <Row className="justify-content-end">
            <Button
              color="primary"
              outline={false}
              className="order-2"
              onClick={chooseClient}
            >
              Iniciar Venda
            </Button>
            <Button
              color="primary"
              outline
              className="order-1 mr-2"
              onClick={() => history.push("/home")}
            >
              Cancelar
            </Button>
          </Row>
        </ModalBody>
      </Modal>
      <Row>
        <Col xs="12" lg="7">
          <Table
            headers={tHeader}
            items={productList}
            size={12}
            action={false}
          />
        </Col>
        <Col xs="12" lg={{ size: 4, offset: 1 }}>
          <Form>
            <FormGroup>
              <Label for="fieldCpf" xs={12}>
                CPF:
              </Label>
              <Col xs={12}>
                <Input
                  type="text"
                  name="fieldCpf"
                  id="fieldCpf"
                  value={cpf !== "" ? cpf : "Não informado"}
                  readOnly
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="fieldProduct" xs={12}>
                EAN/Cód. Barras
              </Label>
              <Col xs={12}>
                <Input
                  type="text"
                  name="fieldProduct"
                  id="fieldProduct"
                  value={product}
                  placeholder="Ex: 789254156982"
                  onChange={e => setProduct(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="fieldQuantity" xs={12}>
                Quantidade
              </Label>
              <Col xs={12} lg={5}>
                <Input
                  type="number"
                  name="fieldQuantity"
                  id="fieldQuantity"
                  min="0"
                  step="1"
                  value={quantity}
                  placeholder="Ex: 10"
                  onChange={e => setQuantity(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col xs={12} lg={{ size: 4, offset: 8 }} className="text-right">
                <Button
                  size="sm"
                  color="primary"
                  outline={true}
                  className=""
                  onClick={insertProduct}
                >
                  Inserir
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <BRow>
            <Col xs={12} lg={12} className="mt-3 text-right">
              <p>
                <strong>Total da Venda:</strong>
                {handleFormat(total)}
              </p>
            </Col>
            <Col xs={12} lg={12} className="mt-1 text-right">
              <p>
                <strong>Total de Impostos(R$):</strong>
                {handleFormat(taxTotal)}
              </p>
            </Col>
            <Col xs={12} className="mt-1 text-right">
              <Button color="primary" onClick={handleSave}>
                Finalizar Venda
              </Button>
            </Col>
          </BRow>
        </Col>
      </Row>
    </Container>
  );
}
