import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand,
  UncontrolledCollapse,
  Nav,
  NavItem
} from "reactstrap";

// import { Container } from './styles';

const Navigation = () => (
  <Navbar className="navbar-horizontal navbar-dark bg-default" expand="lg">
    <Container fluid={true}>
      <NavbarBrand href="/home">Market Expert</NavbarBrand>
      <button
        aria-controls="navbar-default"
        aria-expanded={false}
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-target="#navbar-default"
        data-toggle="collapse"
        id="navbar-default"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <UncontrolledCollapse navbar toggler="#navbar-default">
        <Nav className="ml-lg-auto" navbar>
          <NavItem>
            <NavLink to="/cadastros">Cadastros</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/vendas">Vendas</NavLink>
          </NavItem>
        </Nav>
      </UncontrolledCollapse>
    </Container>
  </Navbar>
);

export default Navigation;
