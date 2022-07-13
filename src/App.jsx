import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

// import Login from "./Components/Login";
import { Fragment, useEffect, useState } from "react";
// import Register from "./Components/Register";
import jwt from "jwt-decode";

import MainPage from "./Components/Client/MainPage";

import AdminPage from "./Components/Admin/AdminPage";

function App() {
  const [typeAcc, setTypeAcc] = useState(0);

  useEffect(() => {


    const token = localStorage.getItem("token");

    if (token === null) setTypeAcc(2);
    else setTypeAcc(jwt(token).roles);
  }, []);

  const Layout = () => {
    switch (typeAcc) {
      case 1:
        return <AdminPage />;
      case 2:
        return <MainPage />;

      default:
        break;
    }
  };

  // Render
  return (
    <Fragment>
      {/* <AdminPage /> */}
      <Layout />
      {/* <Register /> */}
    </Fragment>
  );
}

export default App;
