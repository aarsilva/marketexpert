import styled from "styled-components";
import {
  Container as BContainer,
  Row as BRow,
  Input as BInput
} from "reactstrap";

export const Container = styled(BContainer)`
  padding-top: 35px;
  height: calc(100% - 65px);
`;

export const Row = styled(BRow)`
  height: calc(100% - 20px);
`;

export const Input = styled(BInput)`
  color: #555 !important;
`;
