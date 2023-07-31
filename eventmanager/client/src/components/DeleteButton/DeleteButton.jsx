// DeleteButton.jsx
import React from "react";

import "./Deletebutton.css";

const DeleteButton = ({ deleteUser }) => {
  const handleDelete = () => {
    deleteUser();
  };

  return (
    <button id="delete" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
