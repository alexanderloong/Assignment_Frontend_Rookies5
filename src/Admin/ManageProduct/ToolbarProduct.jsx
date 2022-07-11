import { Fragment } from "react";
import React, { useState } from "react";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { Dialog } from "primereact/dialog";

import DialogNewProduct from "./DialogNewProduct";

export default function ToolbarProduct() {
  // Variables
  let emptyProduct = {
    cat_id: "",
    descripton: "",
    name: "",
    price: "",
    quantity: null,
  };

  // Hooks
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(emptyProduct);

  // Handles
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  // Sub component
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        {/* <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        /> */}
      </React.Fragment>
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        // onClick={saveProduct}
      />
    </React.Fragment>
  );
  // Render
  return (
    <Fragment>
      <Toolbar left={leftToolbarTemplate} />

      <Dialog
        visible={productDialog}
        style={{ width: "600px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <DialogNewProduct
          product={product}
          setProduct={setProduct}
          submitted={submitted}
        />
      </Dialog>
    </Fragment>
  );
}
