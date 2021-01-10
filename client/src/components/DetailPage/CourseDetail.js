import React from "react";

function CourseDetail(props) {
  const { cid, title, courseType } = props;
  return (
    <div>
      <h2 style={{fontSize: "30px", fontWeight: 300, margin: "10px 0"}}>{cid}</h2>
      <h3 style={{fontSize: "24px", margin: "10px 0"}}>{title}</h3>
      <div style={{margin: "10px 0 20px 0"}}>
        <span style={{backgroundColor: "#a5a5a5", padding: "3px 10px", fontSize: "16px"}}>
          {courseType}
        </span>
      </div>
    </div>
  );
}

export default CourseDetail;
