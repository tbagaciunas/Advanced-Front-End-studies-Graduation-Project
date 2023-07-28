import React, { useState } from "react";
import "../src/App.css";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [users, setUsers] = useState([]);

  // Function to add a new user to the list
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const fetchUsers = async () => {
    // Implement the fetching logic here (similar to how it is done in the List component)
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
