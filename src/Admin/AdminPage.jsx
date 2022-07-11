import HeadMenu from "./HeadMenu";

import { Fragment, useState } from "react";
import MainDetail from "./MainDetail";

// Component
export default function AdminPage() {
  // Hooks
  const [activeIndex, setActiveIndex] = useState(0);

  // Render
  return (
    <Fragment>
      <HeadMenu setActiveIndex={setActiveIndex} />

      <MainDetail></MainDetail>
    </Fragment>
  );
}
