import React from "react";

import CourseDetail from "./CourseDetail";

function CourseDetailContainer(props) {
  return (
    <div style={{flex: 4}}>
      {
        props.courseDetails.map(courseDetail => {
          const { cid, title, courseType } = courseDetail;
          return <CourseDetail key={cid} cid={cid} title={title} courseType={courseType} />;
        })
      }
    </div>
  );
}

export default CourseDetailContainer;