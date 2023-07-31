import React, { useEffect } from "react";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

const List = ({ users, updateUser, fetchUsers }) => {
  useEffect(() => {
    fetchUsers(); // Fetch users
  }, [fetchUsers]);

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const updateUserById = async (userId, updatedData) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const formatDate = (birthdate) => {
    const date = new Date(birthdate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user._id} className="user-item">
          <div className="user-column">
            <p>Name: {user.name}</p>
          </div>
          <div className="user-column">
            <p>Email: {user.email}</p>
          </div>
          <div className="user-column">
            <p>Birthdate: {formatDate(user.birthdate)}</p>
          </div>

          <UpdateButton
            user={user}
            updateUser={(data) => updateUserById(user._id, data)}
          />
          <DeleteButton user={user} deleteUser={() => deleteUser(user._id)} />
        </li>
      ))}
    </ul>
  );
};

export default List;
