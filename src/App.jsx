import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import Login from "./Components/Login";
import { Fragment } from "react";
import Register from "./Components/Register";
// import AdminPage from "./Components/Admin/AdminPage";

function App() {
  return (
    <Fragment>
      {/* <AdminPage /> */}
      <Login />
      {/* <Register /> */}
    </Fragment>
  );
}

export default App;
