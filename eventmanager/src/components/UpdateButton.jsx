import React, { useState } from "react";

const UpdateButton = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedUser({ ...user });
  };

  const handleUpdate = () => {
    updateUser(updatedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      {isEditing ? (
        <>
          {/* Input fields for editing */}
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthdate"
            value={updatedUser.birthdate}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default UpdateButton;
