import React from "react";

const ColumnHeading = () => {
  return (
    <div className="column-heading-section flex-cen-cen">
      <div className="column-heading-section__icon"></div>
      <h2 className="heading-s column-heading-section__title">TODO</h2>
      <p className="heading-s column-heading-section__tasks-quantity">(4)</p>
    </div>
  );
};

export default ColumnHeading;
