import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

function NavBar(props) {
  return (
    <React.Fragment>
      <LeftMenu mode="inline" />
      <RightMenu mode="inline" />
    </React.Fragment>
  );
}

export default NavBar;
