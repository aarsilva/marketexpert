import styled from "styled-components";

import {
  Container as BContainer,
  Card as BCard,
  CardText as BCardText
} from "reactstrap";

export const Container = styled(BContainer)`
  padding-top: 35px;
`;

export const Card = styled(BCard)`
  border-radius: 0.35rem;
`;

export const CardText = styled(BCardText)`
  padding-right: 30px;
  font-size: 48px;
  font-weight: 500;
  text-align: right;
`;
