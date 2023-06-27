import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (props.editUser) {
      setEnteredUsername(props.editUser.name);
      setEnteredAge(props.editUser.age);
    }
  }, [props.editUser]);

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    if (props.editUser) {
      props.onUpdateUser(props.editUser.id, enteredUsername, enteredAge);
    } else {
      props.onAddUser(enteredUsername, enteredAge);
    }
    setEnteredUsername("");
    setEnteredAge("");
  };

  //   const usernameChangeHandler = (event) => {
  //     setEnteredUsername(event.target.value);
  //   };
  const usernameChangeHandler = (event) => {
    const input = event.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Regex to allow only alphabets and spaces
    if (regex.test(input)) {
      setEnteredUsername(input);
    }
  };

  //   const ageChangeHandler = (event) => {
  //     setEnteredAge(event.target.value);
  //   };
  const ageChangeHandler = (event) => {
    const input = event.target.value;
    if (input >= 0 && input <= 150) {
      setEnteredAge(input);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">
            {props.editUser ? "Save Changes" : "Add User"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
