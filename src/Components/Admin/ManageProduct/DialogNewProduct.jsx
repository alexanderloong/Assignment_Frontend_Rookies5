import { Fragment, useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

import axios from "axios";

export default function DialogNewProduct(props) {
  // Variables
  const setProduct = props.setProduct;
  const product = props.product;
  const submitted = props.submitted;

  const [categoryItems, setCategoryItems] = useState([]);

  const statuses = [
    { label: "Active", value: "Active" },
    { label: "Unactive", value: "Unactive" },
  ];

  // Hooks

  // Handles
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...props.product };
    _product[`${name}`] = val;

    console.log(_product);
    setProduct(_product);
  };

  // const myUploader = (e) => {
  //   console.log(e.files);
  // };

  // Call api
  useEffect(() => {
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjM5OWFhYi0zYWQ4LTQ1Y2UtOWVkOS03MDZhOTFkNjg0NzAsYWRtaW5AZ21haWwuY29tIiwiaXNzIjoiQWxleGFuZGVyIiwicm9sZXMiOjEsImlhdCI6MTY1NzYxODM4OCwiZXhwIjoxNjU3NzA0Nzg4fQ.jEy1iypR4IbVKEazKp2JNSp4rt-FSjSPuLMGN_hO9_vib00mSKkJi61KogUyCeDTs6rLFA4CSKYntHCvZ63W2Q";
    axios
      .get(`http://127.0.0.1:8080/category`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);

        setCategoryItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="field">
        <label htmlFor="name">Name</label>
        <InputText
          id="name"
          value={product.name}
          onChange={(e) => onInputChange(e, "name")}
          required
          autoFocus
          className={classNames({ "p-invalid": submitted && !product.name })}
        />
        {submitted && !product.name && (
          <small className="p-error">Name is required.</small>
        )}
      </div>
      <div className="field">
        <label htmlFor="description">Descripton</label>
        <InputTextarea
          id="description"
          value={product.descripton}
          onChange={(e) => onInputChange(e, "descripton")}
          required
          rows={3}
          cols={20}
        />
      </div>

      <div className="field">
        <label className="mb-3">Category</label>
        <Dropdown
          optionLabel="name"
          optionValue="cat_id"
          value={product.cat_id}
          options={categoryItems}
          onChange={(e) => onInputChange(e, "cat_id")}
          placeholder="Select a Category"
        />
      </div>

      <div className="formgrid grid">
        <div className="field col">
          <label htmlFor="price">Price</label>
          <InputNumber
            id="price"
            value={product.price}
            onValueChange={(e) => onInputChange(e, "price")}
            mode="currency"
            currency="USD"
            locale="en-US"
            min={0}
          />
        </div>
        <div className="field col">
          <label htmlFor="quantity">Quantity</label>
          <InputNumber
            inputId="minmax-buttons"
            value={product.quantity}
            onValueChange={(e) => onInputChange(e, "quantity")}
            mode="decimal"
            showButtons
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="field">
        <label className="mb-3">Status</label>
        <Dropdown
          value={product.status}
          options={statuses}
          onChange={(e) => onInputChange(e, "status")}
          placeholder="Select a Status"
        />
      </div>

      <div className="field col">
        <label htmlFor="image" className="mb-3">
          Image
        </label>

        <FileUpload name="image" url="./upload" mode="basic" />
      </div>
    </Fragment>
  );
}
