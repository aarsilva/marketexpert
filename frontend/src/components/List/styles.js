import styled from "styled-components";
import {
  Container as BContainer,
  ListGroup as BListGroup,
  ListGroupItem as BListGroupItem
} from "reactstrap";

export const Container = styled(BContainer)`
  height: 100%;
  border: 1px solid #989393;
  border-radius: 5px;
  padding: 10px 15px;
`;

export const ListGroup = styled(BListGroup)``;

export const ListGroupItem = styled(BListGroupItem)`
  background-color: transparent !important;
`;
