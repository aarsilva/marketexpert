import styled from "styled-components";
import {
  Container as BContainer,
  Row as BRow,
  Card as BCard,
  CardText as BCardText
} from "reactstrap";

export const Container = styled(BContainer)`
  padding-top: 35px;
`;

export const Row = styled(BRow)`
  justify-content: center;
`;

export const CardText = styled(BCardText)`
  text-align: center;
  font-weight: 400;
`;
