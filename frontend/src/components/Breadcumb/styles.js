import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.nav`
  display: block;
  width: 100%;
`;

export const Link = styled(NavLink)`
  color: #333;
  text-decoration: none;
  background-color: transparent;

  &.active {
    color: #6c757d;
  }
`;
