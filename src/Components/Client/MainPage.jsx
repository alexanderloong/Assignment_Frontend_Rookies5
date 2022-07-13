import React, { Fragment, useEffect } from "react";

import { Container } from "react-bootstrap";
import DataViewer from "./DataViewer";
import HeaderMain from "./HeaderMain";

function MainPage() {
  // Variables

  // Sub components

  useEffect(() => {
    localStorage.setItem("cart", "null");
  }, []);

  // Render
  return (
    <Fragment>
      <Container>
        <HeaderMain />
        <DataViewer />
      </Container>
    </Fragment>
  );
}

export default MainPage;
