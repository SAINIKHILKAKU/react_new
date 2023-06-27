import React from "react";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  const startEditHandler = (userId) => {
    props.onStartEdit(userId);
  };

  const deleteUserHandler = (userId) => {
    props.onDeleteUser(userId);
  };

  return (
    <ul className={classes.users}>
      {props.users.map((user) => (
        <li key={user.id}>
          <div>
            <span>
              {user.name} ({user.age} years old)
            </span>
            <button onClick={() => startEditHandler(user.id)}>Edit</button>
            <button onClick={() => deleteUserHandler(user.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
