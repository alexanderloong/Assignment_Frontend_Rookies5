import { Fragment } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

import { Dropdown } from "primereact/dropdown";

export default function DialogNewCategory(props) {
  // Variables
  const setProduct = props.setProduct;
  const product = props.product;
  const submitted = props.submitted;

  const statuses = [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Unactive",
      value: "Unactive",
    },
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
        <label htmlFor="description">Description</label>
        <InputTextarea
          id="description"
          value={product.descripton}
          onChange={(e) => onInputChange(e, "description")}
          required
          rows={3}
          cols={20}
        />
      </div>
      <div className="field">
        <label htmlFor="description">Status</label>

        <Dropdown
          value={product.status}
          options={statuses}
          onChange={(e) => onInputChange(e, "status")}
          placeholder="Select a Status"
        />
      </div>
    </Fragment>
  );
}
