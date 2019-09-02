import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import { Container, Link } from "./styles";

const Breadcumb = ({ list }) => {
  return (
    <Container>
      <Breadcrumb>
        {list.map((value, key) => {
          if (typeof value.url !== "undefined")
            return (
              <BreadcrumbItem key={key}>
                <Link to={value.url} exact>
                  {value.text}
                </Link>
              </BreadcrumbItem>
            );

          return (
            <BreadcrumbItem key={key}>
              <span>{value.text}</span>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Container>
  );
};

export default Breadcumb;
