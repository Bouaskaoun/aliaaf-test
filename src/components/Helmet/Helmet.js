import React from "react";

const Helmet = (props) => {
  document.title = "Aliaaf -" + props.title;
  return (
    <div className="w-100 mb-5" style={{ marginTop: "100px" }}>
      {props.children}
    </div>
  );
};

export default Helmet;
