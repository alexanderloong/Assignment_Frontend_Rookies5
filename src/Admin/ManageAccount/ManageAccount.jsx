import { Fragment, useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";

import axios from "axios";
import { Column } from "primereact/column";

// Component
export default function ManageAccount() {
  // Variables
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjM5OWFhYi0zYWQ4LTQ1Y2UtOWVkOS03MDZhOTFkNjg0NzAsYWRtaW5AZ21haWwuY29tIiwiaXNzIjoiQWxleGFuZGVyIiwicm9sZXMiOjEsImlhdCI6MTY1NzYxODM4OCwiZXhwIjoxNjU3NzA0Nzg4fQ.jEy1iypR4IbVKEazKp2JNSp4rt-FSjSPuLMGN_hO9_vib00mSKkJi61KogUyCeDTs6rLFA4CSKYntHCvZ63W2Q";

  // Hooks
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [force, setForce] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState();

  // Handles

  useEffect(() => {
    getAccounts();
  }, [force]);

  const handleEnable = () => {
    enableAccount();

    // setForce(force + 1);
  };

  const handleDisable = () => {
    disableAccount();

    // setForce(force + 1);
  };

  // Subcomponent
  const leftToolbar = () => {
    return (
      <Fragment>
        <Button
          label="Disable"
          icon="pi pi-times"
          className="p-button-danger me-3"
          onClick={handleDisable}
          disabled={!selectedAccount}
        />

        <Button
          label="Enable"
          icon="pi pi-check"
          className="p-button-success me-3"
          onClick={handleEnable}
          disabled={!selectedAccount}
        />
      </Fragment>
    );
  };

  // Call API
  const getAccounts = () => {
    axios
      .get(`http://127.0.0.1:8080/users`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        setAccounts(res.data);

        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enableAccount = () => {
    axios
      .patch(`http://127.0.0.1:8080/users/${selectedAccount.account_id}`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);
        setForce(force + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disableAccount = () => {
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .patch(
        `http://127.0.0.1:8080/users/disable/${selectedAccount.account_id}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setForce(force + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Render
  return (
    <Fragment>
      <Toolbar left={leftToolbar} />

      <DataTable
        value={accounts}
        dataKey="account_id"
        paginator
        rows={10}
        responsiveLayout="scroll"
        loading={loading}
        emptyMessage="No accounts found!"
        selection={selectedAccount}
        onSelectionChange={(e) => setSelectedAccount(e.value)}
        selectionMode="single"
      >
        <Column field="name" header="Name User" />
        <Column field="phone" header="Phone Number" />
        <Column field="phone" header="Address" />
        <Column field="birthdate" header="Birthday" />
        <Column field="email" header="Email" />
        <Column field="role_id" header="Role" />
        <Column field="status" header="Status" />
      </DataTable>
    </Fragment>
  );
}
