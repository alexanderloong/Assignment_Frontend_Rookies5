import { Fragment } from "react";
import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import axios from "axios";

import DialogNewProduct from "./DialogNewProduct";
import DialogUpdateProduct from "./DialogUpdateProduct";

export default function ToolbarProduct(props) {
  // Variables
  let emptyProduct = {
    prod_id: "",
    descripton: "",
    name: "",
    price: "",
    quantity: null,
  };
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjM5OWFhYi0zYWQ4LTQ1Y2UtOWVkOS03MDZhOTFkNjg0NzAsYWRtaW5AZ21haWwuY29tIiwiaXNzIjoiQWxleGFuZGVyIiwicm9sZXMiOjEsImlhdCI6MTY1NzYxODM4OCwiZXhwIjoxNjU3NzA0Nzg4fQ.jEy1iypR4IbVKEazKp2JNSp4rt-FSjSPuLMGN_hO9_vib00mSKkJi61KogUyCeDTs6rLFA4CSKYntHCvZ63W2Q";

  const selectedProduct1 = props.selectedProduct1;
  const setSelectedProduct1 = props.setSelectedProduct1;

  // Hooks
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog2, setProductDialog2] = useState(false);
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
      postProduct();

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Product Created",
        life: 3000,
      });

      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const updateProduct = () => {
    setSubmitted(true);

    putProduct();

    if (product.name.trim()) {
      // postProduct();

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Product Updated!",
        life: 3000,
      });

      setSelectedProduct1(null);
      setProductDialog2(false);
      setProduct(emptyProduct);
    }
  };

  const openUpdate = () => {
    setProduct(selectedProduct1);
    setSubmitted(false);
    setProductDialog2(true);
  };

  const confirmDeleteSelected = () => {
    setSubmitted(true);

    deleteProduct();

    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Created",
      life: 3000,
    });

    setSelectedProduct1(null);
    setProductDialog(false);
    setProduct(emptyProduct);
  };

  // Sub component
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success me-3"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger me-3"
          onClick={confirmDeleteSelected}
          disabled={!selectedProduct1}
        />

        <Button
          label="Update"
          icon="pi pi-sync"
          className="p-button-info"
          onClick={openUpdate}
          disabled={!selectedProduct1}
        />
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

  const updateProductDialogFooter = (
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
        onClick={updateProduct}
      />
    </React.Fragment>
  );

  // Call API
  const postProduct = () => {
    axios
      .post(`http://127.0.0.1:8080/product`, product, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);
        props.setForce();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`http://127.0.0.1:8080/product/${selectedProduct1.prod_id}`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);
        props.setForce();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putProduct = () => {
    axios
      .put(
        `http://127.0.0.1:8080/product/${selectedProduct1.prod_id}`,
        product,
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        props.setForce();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Render
  return (
    <Fragment>
      <Toast ref={toast} />
      <Toolbar left={leftToolbarTemplate} />

      <Dialog
        visible={productDialog}
        style={{ width: "600px" }}
        header="Create Product"
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

      <Dialog
        visible={productDialog2}
        style={{ width: "600px" }}
        header="Update Product"
        modal
        className="p-fluid"
        footer={updateProductDialogFooter}
        onHide={hideDialog}
      >
        <DialogUpdateProduct
          product={product}
          setProduct={setProduct}
          submitted={submitted}
        />
      </Dialog>
    </Fragment>
  );
}
