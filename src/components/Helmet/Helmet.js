import React from "react";

const Helmet = (props) => {
  document.title = "Aliaaf -" + props.title;
  return <div className="w-100 pb-5 biblio">{props.children}</div>;
};

export default Helmet;
