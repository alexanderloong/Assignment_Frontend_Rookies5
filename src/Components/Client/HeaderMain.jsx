import React, { Fragment } from "react";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export function HeaderMain() {
  // Hooks
  let navigate = useNavigate();

  // Variables

  // Handles
  const signOut = () => {
    if (localStorage.getItem("token") !== null)
      localStorage.removeItem("token");

    navigate("/signin");
  };

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
        onClick={signOut}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <Toolbar left={leftContents} right={rightContents} />
    </Fragment>
  );
}

export default HeaderMain;
