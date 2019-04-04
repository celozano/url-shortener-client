import React from "react";

const WarningBanner = props => {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="alert alert-danger fixed-top" style={{ borderRadius: "0" }}>
      <small>{props.message}</small>
    </div>
  );
};

export default WarningBanner;
