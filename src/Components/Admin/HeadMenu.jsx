import { Fragment } from "react";

import { Button } from "primereact/button";


// Component
export default function HeadMenu(props) {

    // Render
  return (
    <Fragment>
      <h1>Admin Page</h1>

      <div className="pt-2 pb-4">
        <Button
          onClick={() => props.setActiveIndex(0)}
          className="p-button-text"
          label="Information Account"
        />
        <Button
          onClick={() => props.setActiveIndex(1)}
          className="p-button-text"
          label="Manage Product"
        />
        <Button
          onClick={() => props.setActiveIndex(2)}
          className="p-button-text"
          label="Manage Category"
        />
        <Button
          onClick={() => props.setActiveIndex(3)}
          className="p-button-text"
          label="Manage Customer"
        />
      </div>
    </Fragment>
  );
}
