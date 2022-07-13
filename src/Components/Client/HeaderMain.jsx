import React, { Fragment } from "react";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Container } from "react-bootstrap";

export function HeaderMain() {
  // Variables

  // Sub components
  const leftContents = (
    <Fragment>
      <h3>Sanzial Store</h3>
    </Fragment>
  );

  const rightContents = (
    <Fragment>
      <Button
        icon="pi pi-shopping-cart"
        className="p-button-rounded  p-button-text me-2"
      />
      <Button
        icon="pi pi-user"
        className="p-button-rounded  p-button-text me-2"
      />
    </Fragment>
  );

  return (
    <Fragment>
      <Container>
        <Toolbar left={leftContents} right={rightContents} />
      </Container>
    </Fragment>
  );
}

export default HeaderMain;
