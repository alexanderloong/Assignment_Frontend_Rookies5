import { Fragment } from "react";
import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

import axios from "axios";

import DialogNewCategory from "./DialogNewCategory";

export default function ToolbarCategory() {
  // Variables
  let emptyProduct = {
    description: "",
    name: "",
  };

  // Hooks
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const toast = useRef(null);

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

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      postCategory();

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Category Created",
        life: 3000,
      });

      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  // Call API
  const postCategory = () => {
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NGNlMjQwOS01NGQ3LTRkMGUtOTQ2MS0xMDYyYzAzM2ZmZDIsYWRtaW5AZ21haWwuY29tIiwiaXNzIjoiQWxleGFuZGVyIiwicm9sZXMiOjEsImlhdCI6MTY1NzU1ODkxNCwiZXhwIjoxNjU3NjQ1MzE0fQ.GSxyZE9FQLm5d4fgTLPY8wVP9gB1qJ-rCrEEpO3KQCgBHrNAhd7bbDRT0Ip2fBBycikhKqxFk-4YBM45xrkdnw";

    axios
      .post(`http://127.0.0.1:8080/category`, product, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  // Render
  return (
    <Fragment>
      <Toast ref={toast} />

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
        <DialogNewCategory
          product={product}
          setProduct={setProduct}
          submitted={submitted}
        />
      </Dialog>
    </Fragment>
  );
}
