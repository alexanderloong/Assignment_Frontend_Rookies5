import { Fragment } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

export default function DialogNewCategory(props) {
  // Variables
  const setProduct = props.setProduct;
  const product = props.product;
  const submitted = props.submitted;

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
    </Fragment>
  );
}
