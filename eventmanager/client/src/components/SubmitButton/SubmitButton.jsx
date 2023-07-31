import React from "react";
import "./SubmitButton";

const SubmitButton = ({ onSubmit }) => {
  return (
    <button id="submit" type="submit" onClick={onSubmit}>
      Submit
    </button>
  );
};

export default SubmitButton;
