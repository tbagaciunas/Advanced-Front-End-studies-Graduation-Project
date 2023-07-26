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

  return (
    <div className="App">
      <h1>User Registration Form</h1>
      <Form addUser={addUser} />

      <h2>User List</h2>
      <List users={users} />
    </div>
  );
};

export default App;
