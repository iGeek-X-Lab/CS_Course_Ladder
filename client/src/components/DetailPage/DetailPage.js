import React from "react";

import SideMenu from "./SideMenu";
import CourseDetailContainer from "./CourseDetailContainer";

/**
 * 
 */
function DetailPage() {
  // container
  return (
    <div style={{display: "flex"}}>
      <SideMenu />
      <CourseDetailContainer />
    </div>
  );
}

export default DetailPage;
