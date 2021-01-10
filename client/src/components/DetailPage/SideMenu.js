import React from "react";

import SearchBar from "./SearchBar";
import DropDownMenu from "./DropDownMenu";

function SideMenu() {
  const courseLevelDropDown = <DropDownMenu />;
  const courseTypeDropDown = <DropDownMenu />;

  return (
    <div style={{flex: 1, minWidth: "200px"}}>
      <SearchBar />
      {courseLevelDropDown}
      {courseTypeDropDown}
    </div>
  );
}

export default SideMenu;
