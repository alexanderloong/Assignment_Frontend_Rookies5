import { Fragment } from "react";
import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

import axios from "axios";

import DialogNewCategory from "./DialogNewCategory";
import DialogUpdateCategory from "./DialogUpdateCategory";

export default function ToolbarCategory(props) {
  // Variables
  let emptyProduct = {
    description: "",
    name: "",
    status: "",
  };

  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjM5OWFhYi0zYWQ4LTQ1Y2UtOWVkOS03MDZhOTFkNjg0NzAsYWRtaW5AZ21haWwuY29tIiwiaXNzIjoiQWxleGFuZGVyIiwicm9sZXMiOjEsImlhdCI6MTY1NzYxODM4OCwiZXhwIjoxNjU3NzA0Nzg4fQ.jEy1iypR4IbVKEazKp2JNSp4rt-FSjSPuLMGN_hO9_vib00mSKkJi61KogUyCeDTs6rLFA4CSKYntHCvZ63W2Q";

  const selectedProduct1 = props.selectedProduct1;
  const setSelectedProduct1 = props.setSelectedProduct1;

  // Hooks
  const [productDialog, setProductDialog] = useState(false);
  const [productDialog2, setProductDialog2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const toast = useRef(null);

  // Handles
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const openUpdate = () => {
    setProduct(selectedProduct1);
    setSubmitted(false);
    setProductDialog2(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setProductDialog2(false);
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

  const updateProduct = () => {
    setSubmitted(true);
    updateCategory();

    if (product.name.trim()) {
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Category Updated",
        life: 3000,
      });

      setSelectedProduct1(null);
      setProductDialog2(false);
      setProduct(emptyProduct);
    }
  };

  const confirmDeleteSelected = () => {
    setSubmitted(true);
    deleteCategory();

    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Category Created",
      life: 3000,
    });

    setSelectedProduct1(null);
    setProductDialog(false);
    setProduct(emptyProduct);
  };

  // Call API
  const postCategory = () => {
    axios
      .post(`http://127.0.0.1:8080/category`, product, {
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

  const updateCategory = () => {
    axios
      .put(
        `http://127.0.0.1:8080/category/${selectedProduct1.cat_id}`,
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

  const deleteCategory = () => {
    axios
      .delete(`http://127.0.0.1:8080/category/${selectedProduct1.cat_id}`, {
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
          className="p-button-danger  me-3"
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

  const upCategoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Update"
        icon="pi pi-check"
        className="p-button-text"
        onClick={updateProduct}
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

      <Dialog
        visible={productDialog2}
        style={{ width: "600px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={upCategoryDialogFooter}
        onHide={hideDialog}
      >
        <DialogUpdateCategory
          product={product}
          setProduct={setProduct}
          submitted={submitted}
        />
      </Dialog>
    </Fragment>
  );
}
