import React from "react";

const SubmitButton = ({ onSubmit }) => {
  return (
    <button id="submit" type="submit" onClick={onSubmit}>
      Submit
    </button>
  );
};

export default SubmitButton;
