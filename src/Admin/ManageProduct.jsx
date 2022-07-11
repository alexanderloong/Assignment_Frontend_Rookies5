import React, { useState, useEffect } from "react";

import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

let data = [
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1001,
    name: "Josephine Darakjy",
    country: {
      name: "Egypt",
      code: "eg",
    },
    company: "Chanay, Jeffrey A Esq",
    date: "2019-02-09",
    status: "proposal",
    verified: true,
    activity: 0,
    representative: {
      name: "Amy Elsner",
      image: "amyelsner.png",
    },
    balance: 82429,
  },
  {
    id: 1002,
    name: "Art Venere",
    country: {
      name: "Panama",
      code: "pa",
    },
    company: "Chemel, James L Cpa",
    date: "2017-05-13",
    status: "qualified",
    verified: false,
    activity: 63,
    representative: {
      name: "Asiya Javayant",
      image: "asiyajavayant.png",
    },
    balance: 28334,
  },
  {
    id: 1003,
    name: "Lenna Paprocki",
    country: {
      name: "Slovenia",
      code: "si",
    },
    company: "Feltz Printing Service",
    date: "2020-09-15",
    status: "new",
    verified: false,
    activity: 37,
    representative: {
      name: "Xuxue Feng",
      image: "xuxuefeng.png",
    },
    balance: 88521,
  },
  {
    id: 1004,
    name: "Donette Foller",
    country: {
      name: "South Africa",
      code: "za",
    },
    company: "Printing Dimensions",
    date: "2016-05-20",
    status: "proposal",
    verified: true,
    activity: 33,
    representative: {
      name: "Asiya Javayant",
      image: "asiyajavayant.png",
    },
    balance: 93905,
  },
  {
    id: 1005,
    name: "Simona Morasca",
    country: {
      name: "Egypt",
      code: "eg",
    },
    company: "Chapman, Ross E Esq",
    date: "2018-02-16",
    status: "qualified",
    verified: false,
    activity: 68,
    representative: {
      name: "Ivan Magalhaes",
      image: "ivanmagalhaes.png",
    },
    balance: 50041,
  },
  {
    id: 1006,
    name: "Mitsue Tollner",
    country: {
      name: "Paraguay",
      code: "py",
    },
    company: "Morlong Associates",
    date: "2018-02-19",
    status: "renewal",
    verified: true,
    activity: 54,
    representative: {
      name: "Ivan Magalhaes",
      image: "ivanmagalhaes.png",
    },
    balance: 58706,
  },
  {
    id: 1007,
    name: "Leota Dilliard",
    country: {
      name: "Serbia",
      code: "rs",
    },
    company: "Commercial Press",
    date: "2019-08-13",
    status: "renewal",
    verified: true,
    activity: 69,
    representative: {
      name: "Onyama Limba",
      image: "onyamalimba.png",
    },
    balance: 26640,
  },
  {
    id: 1008,
    name: "Sage Wieser",
    country: {
      name: "Egypt",
      code: "eg",
    },
    company: "Truhlar And Truhlar Attys",
    date: "2018-11-21",
    status: "unqualified",
    verified: true,
    activity: 76,
    representative: {
      name: "Ivan Magalhaes",
      image: "ivanmagalhaes.png",
    },
    balance: 65369,
  },
  {
    id: 1009,
    name: "Kris Marrier",
    country: {
      name: "Mexico",
      code: "mx",
    },
    company: "King, Christopher A Esq",
    date: "2015-07-07",
    status: "proposal",
    verified: false,
    activity: 3,
    representative: {
      name: "Onyama Limba",
      image: "onyamalimba.png",
    },
    balance: 63451,
  },
  {
    id: 1010,
    name: "Minna Amigon",
    country: {
      name: "Romania",
      code: "ro",
    },
    company: "Dorl, James J Esq",
    date: "2018-11-07",
    status: "qualified",
    verified: false,
    activity: 38,
    representative: {
      name: "Anna Fali",
      image: "annafali.png",
    },
    balance: 71169,
  },
];

// Component
export default function ManageProduct() {
  // Hooks
  const [customers2, setCustomers2] = useState(null);

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
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

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt="flag"
          src="/images/flag/flag_placeholder.png"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className={`flag flag-${rowData.country.code}`}
          width={30}
        />
        <span className="image-text">{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.representative;
    return (
      <React.Fragment>
        <img
          alt={representative.name}
          src={`images/avatar/${representative.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{representative.name}</span>
      </React.Fragment>
    );
  };

  const representativeRowFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
      />
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={`images/avatar/${option.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{option.name}</span>
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

  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  useEffect(() => {
    setCustomers2(data);
    setLoading2(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render
  return (
    <div className="datatable-filter-demo">
      <div className="card">
        <DataTable
          value={customers2}
          paginator
          className="p-datatable-customers"
          rows={10}
          dataKey="id"
          filters={filters2}
          filterDisplay="row"
          loading={loading2}
          responsiveLayout="scroll"
          globalFilterFields={[
            "name",
            "country.name",
            "representative.name",
            "status",
          ]}
          header={header2}
          emptyMessage="No customers found."
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
            filterField="country.name"
            style={{ minWidth: "12rem" }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by description"
          />
          <Column
            header="Quantity"
            filterField="representative"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={representativeBodyTemplate}
            filter
            filterElement={representativeRowFilterTemplate}
          />
          <Column
            header="Price"
            filterField="representative"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={representativeBodyTemplate}
            filter
            filterElement={representativeRowFilterTemplate}
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
