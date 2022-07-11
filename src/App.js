import { Fragment } from "react";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import Header from "./Components/Header";

function App() {
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
}

export default App;
