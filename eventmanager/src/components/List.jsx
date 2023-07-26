import React, { useState, useEffect } from "react";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

const List = ({ updateUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users: Server returned an error");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

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

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {/* Display user information */}
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Birthdate: {user.birthdate}</p>{" "}
          <UpdateButton user={user} updateUser={updateUser} />
          <DeleteButton user={user} deleteUser={() => deleteUser(user._id)} />
        </li>
      ))}
    </ul>
  );
};

export default List;
