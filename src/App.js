import React, { useState } from "react";

import AddUser from "./Components/Users/AddUser";
import UsersList from "./Components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  const updateUserHandler = (userId, newName, newAge) => {
    setUsersList((prevUsersList) => {
      return prevUsersList.map((user) => {
        if (user.id === userId) {
          return { ...user, name: newName, age: newAge };
        }
        return user;
      });
    });
    setEditUser(null);
  };

  const deleteUserHandler = (userId) => {
    setUsersList((prevUsersList) => {
      return prevUsersList.filter((user) => user.id !== userId);
    });
  };

  const startEditHandler = (userId) => {
    const userToEdit = usersList.find((user) => user.id === userId);
    setEditUser(userToEdit);
  };

  return (
    <div>
      <AddUser
        onAddUser={addUserHandler}
        editUser={editUser}
        onUpdateUser={updateUserHandler}
      />
      <UsersList
        users={usersList}
        onDeleteUser={deleteUserHandler}
        onStartEdit={startEditHandler}
      />
    </div>
  );
}

export default App;
