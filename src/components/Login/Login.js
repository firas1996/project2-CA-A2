import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { AuthStore } from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type == "USER_KTEB_EMAIL") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type == "USER_NZEL_EL_BARRA") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};
const passwordReducer = (state, action) => {
  if (action.type == "USER_KTEB_EMAIL") {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (action.type == "USER_NZEL_EL_BARRA") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: null };
};

const Login = () => {
  const AuthCtx = useContext(AuthStore);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  // """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;
  useEffect(() => {
    const t = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
      console.log("Effect");
    }, 500);
    return () => {
      clearTimeout(t);
      console.log("clean Up");
    };
  }, [emailIsValid, passwordIsValid]);

  // """"""""""""""""""""""""""""""""""""""""""""""
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_KTEB_EMAIL", payload: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") && password.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_KTEB_EMAIL", payload: event.target.value });
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && email.value.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmail({ type: "USER_NZEL_EL_BARRA" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "USER_NZEL_EL_BARRA" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
