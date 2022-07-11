import React, { useState, useEffect } from "react";

import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import axios from "axios";

// Component
export default function ManageProduct() {
  // Hooks
  const [customers2, setCustomers2] = useState(null);

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    descripton: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [loading2, setLoading2] = useState(true);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");

  // Handles
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  // Sub component
  const renderHeader2 = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  // Variables
  const header2 = renderHeader2();

  const statuses = [1, 2 ];

  // Call API
  useEffect(() => {
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NGNlMjQwOS01NGQ3LTRkMGUtOTQ2MS0xMDYyYzAzM2ZmZDIsYWRtaW5AZ21haWwuY29tIiwiaXNzIjoiQWxleGFuZGVyIiwicm9sZXMiOjEsImlhdCI6MTY1NzUzMTk0MSwiZXhwIjoxNjU3NjE4MzQxfQ.5uHp9qCimYgV1bZxQgd98lfDDk9f0V6NPBES4_KhGjnjrJhq_cY1oV64VJY67lnx43xDn5mVCQ3MfwArQY9SbA";

    axios
      .get(`http://127.0.0.1:8080/product`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(data);
        setCustomers2(res.data);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Render
  return (
    <div className="datatable-filter-demo">
      <div className="card">
        <DataTable
          value={customers2}
          paginator
          className="p-datatable-customers"
          rows={10}
          dataKey="prod_id"
          filters={filters2}
          filterDisplay="row"
          loading={loading2}
          responsiveLayout="scroll"
          globalFilterFields={[
            "name",
            "descripton",
            "quantity",
            "price",
            "status",
          ]}
          header={header2}
          emptyMessage="No products found."
        >
          <Column
            field="name"
            header="Name Product"
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Description"
            field="descripton"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Quantity"
            field="quantity"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
          />
          <Column
            header="Price"
            field="price"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="status"
            header="Status"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusRowFilterTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
}
