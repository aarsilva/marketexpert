import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import Cadastros from "./pages/Cadastros";
import Products from "./pages/Products";
import ProductForm from "./pages/Products/Form";
import Categories from "./pages/Categories";
import CategoryForm from "./pages/Categories/Form";
import Taxes from "./pages/Taxes";
import TaxForm from "./pages/Taxes/Form";
import Invoices from "./pages/Invoices";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route
          path="/"
          render={() => (
            <>
              <Navigation />
              <Route path="/home" component={Home} />
              <Route path="/cadastros" exact component={Cadastros} />
              <Route path="/cadastros/produtos" exact component={Products} />
              <Route path="/cadastros/produtos/novo" component={ProductForm} />
              <Route
                path="/cadastros/categorias"
                exact
                component={Categories}
              />
              <Route
                path="/cadastros/categorias/nova"
                component={CategoryForm}
              />
              <Route path="/cadastros/impostos" exact component={Taxes} />
              <Route path="/cadastros/impostos/novo" component={TaxForm} />
              <Route path="/vendas" component={Invoices} />
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
