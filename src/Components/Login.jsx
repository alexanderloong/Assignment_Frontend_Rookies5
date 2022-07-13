import React from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

import axios from "axios";

import "./FormDemo.css";

export default function Register() {
  const validate = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    loginAccount(data);

    // form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  // Call API
  const loginAccount = (data) => {
    axios
      .post(`http://127.0.0.1:8080/auth/signin`, data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Render
  return (
    <div className="form-demo">
      <div className="d-flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Login</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              email: "",
              password: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <InputText
                          type="password"
                          id="password"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label htmlFor="password">Password</label>
                      </span>
                    </div>
                  )}
                />

                <Button type="submit" label="Submit" className="mt-2" />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
