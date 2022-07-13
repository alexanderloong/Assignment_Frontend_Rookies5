import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";

import { DataView } from "primereact/dataview";

import ProductItems from "./ProductItems";

function DataViewer() {
  // Hooks
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  // Call API
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://127.0.0.1:8080/category`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Sub Components
  // const header = () => {
  //   return (
  //     <div className="grid grid-nogutter">
  //       <div className="col-6" style={{ textAlign: "left" }}>
  //         <Dropdown
  //           options={sortOptions}
  //           value={sortKey}
  //           optionLabel="label"
  //           placeholder="Sort By Price"
  //           onChange={onSortChange}
  //         />
  //       </div>
  //       <div className="col-6" style={{ textAlign: "right" }}>
  //         <DataViewLayoutOptions
  //           layout={layout}
  //           onChange={(e) => setLayout(e.value)}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    return <ProductItems product={product} category={categories} />;
  };

  // Render
  return (
    <Fragment>
      <div className="dataview-demo">
        <div className="card">
          <DataView
            value={products}
            layout="grid"
            // header={header}
            itemTemplate={itemTemplate}
            paginator
            rows={9}
            // sortOrder={sortOrder}
            // sortField={sortField}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default DataViewer;
