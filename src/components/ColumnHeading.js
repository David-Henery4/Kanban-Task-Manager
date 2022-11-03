import React from "react";

const ColumnHeading = ({ name, quantity }) => {
  //
  return (
    <div className="column-heading-section flex-cen-cen">
      <div
        className="column-heading-section__icon"
        style={{
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        }}
      ></div>
      <h2 className="heading-s column-heading-section__title">
        {name && name.toUpperCase()}
      </h2>
      <p className="heading-s column-heading-section__tasks-quantity">
        ({quantity})
      </p>
    </div>
  );
};

export default ColumnHeading;
