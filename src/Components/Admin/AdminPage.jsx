import HeadMenu from "./HeadMenu";

import { Fragment, useState } from "react";
import ManageProduct from "./ManageProduct/ManageProduct";
import ManageCategory from "./ManageCategory/ManageCategory";
import InformationAccount from "./InformationAccount";
import ManageAccount from "./ManageAccount/ManageAccount";
import Container from "react-bootstrap/esm/Container";

// Component
export default function AdminPage() {
  // Hooks
  const [activeIndex, setActiveIndex] = useState(0);

  const MainDetail = () => {
    switch (activeIndex) {
      case 0:
        return <InformationAccount />;

      case 1:
        return <ManageProduct />;

      case 2:
        return <ManageCategory />;

      case 3:
        return <ManageAccount />;

      default:
        break;
    }
  };

  // Render
  return (
    <Fragment>
      <Container className="text-center">
        <HeadMenu setActiveIndex={setActiveIndex} />
        <MainDetail />
      </Container>
    </Fragment>
  );
}
