import { Fragment } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

export default function DialogNewProduct(props) {
  // Variables
  const setProduct = props.setProduct;
  const product = props.product;
  const submitted = props.submitted;

  const categoryItems = [
    { label: "Phone", value: "Lap" },
    { label: "Laptop", value: "Phone" },
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
      <div className="field col">
        <label htmlFor="image" className="mb-3">
          Image
        </label>

        <FileUpload name="image" url="./upload" mode="basic" />
      </div>
    </Fragment>
  );
}
