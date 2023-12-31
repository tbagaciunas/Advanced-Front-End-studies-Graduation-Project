import React, { useState } from "react";
import "../src/App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";

const App = () => {
  const [users, setUsers] = useState([]);

  //  add a new user to the list
  const addUser = (user) => {
    setUsers([...users, user]);
  };

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

  return (
    <div className="App">
      <h1>Event Manager</h1>
      <Form addUser={addUser} fetchUsers={fetchUsers} />

      <h2>Users List</h2>
      <List users={users} fetchUsers={fetchUsers} />
    </div>
  );
};

export default App;
