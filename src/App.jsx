import "bootstrap/dist/css/bootstrap.css";

import "/node_modules/primeflex/primeflex.css";

import "./App.css";

import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import {  useEffect, useState } from "react";
import Register from "./Components/Register";

import jwt from "jwt-decode";

import MainPage from "./Components/Client/MainPage";

import AdminPage from "./Components/Admin/AdminPage";

// Components
function App() {
  const [typeAcc, setTypeAcc] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log(token);

    if (token !=null) setTypeAcc(jwt(token).roles);
    else setTypeAcc(2);
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
