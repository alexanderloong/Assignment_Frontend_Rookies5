import React, { Fragment, useRef } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function ProductItems(props) {
  // Hooks
  const toast = useRef(null);

  // Variables
  const data = props.product;

  // Handles
  const handleAddToCart = () => {
    toast.current.show({
      severity: "success",
      summary: "Add To Cart",
      detail: `${data.name} added to cart!`,
      life: 3000,
    });

    let cart = [];

    if (localStorage.getItem("cart") !== "null")
      cart = JSON.parse(localStorage.getItem("cart"));

    cart.push(data);
    console.log(cart);

    localStorage.setItem("cart", JSON.stringify(cart));
  };


  // Render
  return (
    <Fragment>
      <Toast ref={toast} />

      <div className="col-12 md:col-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.cat_id}</span>
            </div>
            <span className={`product-badge status-${data.status}`}>
              {data.status}
            </span>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png`}
              alt="no!"
            />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.descripton}</div>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.status === "Unactive"}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductItems;
