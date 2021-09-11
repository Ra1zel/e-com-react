import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/Auth-Context";
import "./LoginForm.css";
let finalClass = "";
let finalClass2 = "";
let errorMessage = "";
const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsvalid, setEmailIsValid] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const AuthCtx = useContext(AuthContext);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsError(false);
    setisLoading(true);
    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSIBvJtLXP5dxFWgGDdEilQQ5WJlNaqLY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSIBvJtLXP5dxFWgGDdEilQQ5WJlNaqLY";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setisLoading(false);
      if (res.ok) {
        res.json().then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          AuthCtx.login(data.idToken, data.email, expirationTime.toISOString());
          history.replace("/");
        });
      } else {
        res.json().then((data) => {
          if (data && data.error && data.error.message) {
            console.log(data.error.message);
            if (data.error.message === "INVALID_PASSWORD") {
              errorMessage = "Sorry the password you entered is incorrect";
              console.log(errorMessage);
              setIsError(true);
            } else if (data.error.message === "EMAIL_NOT_FOUND") {
              errorMessage = "Oops! There is no account for this email!";
              console.log(errorMessage);
              setIsError(true);
            } else if (data.error.message === "EMAIL_EXISTS") {
              errorMessage = "Oops! This Email is Already Taken";
              console.log(errorMessage);
              setIsError(true);
            }
          }
        });
      }
    });
  };
  const emailChangeHandler = (e) => {
    const enteredText = e.target.value.trim();
    const re = /\S+@\S+\.\S+/; //regular expression to check email validity : anystring@anystring.anystring
    const result = re.test(enteredText);
    setEmailIsValid(result);
    if (result === true) {
      setEnteredEmail(enteredText);
    }
  };
  const emailFocusChangeHandler = () => {
    setEmailIsTouched(true);
  };
  const emailBlurChangeHandler = (e) => {
    if (emailIsTouched === true && enteredEmail.length === 0) {
      setEmailIsValid(false);
    }
  };
  const passwordChangeHandler = (e) => {
    let bool = false;
    const enteredText = e.target.value.trim();
    if (enteredText.length > 6) {
      setPasswordIsValid(true);
      bool = true;
    } else {
      setPasswordIsValid(false);
    }

    if (bool === true) {
      setEnteredPassword(enteredText);
    }
  };
  const passwordFocusChangeHandler = () => {
    setPasswordIsTouched(true);
  };
  const passwordBlurChangeHandler = () => {
    if (passwordIsTouched === true && enteredPassword.length < 7) {
      setPasswordIsValid(false);
    }
  };
  if (emailIsTouched === false) {
    finalClass = "";
  } else {
    if (emailIsvalid) {
      finalClass = "form-input-valid";
    } else {
      finalClass = "form-input-invalid";
    }
  }
  if (passwordIsTouched === false) {
    finalClass2 = "";
  } else {
    if (passwordIsValid) {
      finalClass2 = "form-input-valid";
    } else {
      finalClass2 = "form-input-invalid";
    }
  }
  let formTitle = "";
  let formCopy = "";
  let formLink = "";
  let formButton = "";
  if (isLogin) {
    formTitle = "Sign in to Shop It";
    formCopy = "Don't have an account?";
    formLink = "Sign up";
    formButton = "Login";
  } else {
    formTitle = "Create an account";
    formCopy = "Already have an account?";
    formLink = "Login";
    formButton = "Sign up";
  }
  const formTypeHandler = () => {
    setIsLogin((prevState) => {
      return !prevState;
    });
  };
  return (
    <React.Fragment>
      <div className={` ${isLogin === true ? "form-toggle" : "form-toggle-2"}`}>
        <div className="form-container">
          {isError === true ? (
            <p className="form-copy-error">{errorMessage}</p>
          ) : (
            ""
          )}
          <h3 className="form-heading">{formTitle}</h3>
          <p className="form-copy">
            {formCopy}
            <Link to="/auth" onClick={formTypeHandler}>
              {formLink}
            </Link>
          </p>

          <form className="form-main" onSubmit={formSubmitHandler}>
            <input
              type="email"
              className={`form-input ${finalClass}`}
              placeholder="Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurChangeHandler}
              onFocus={emailFocusChangeHandler}
            ></input>
            <input
              type="password"
              className={`form-input ${finalClass2}`}
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurChangeHandler}
              onFocus={passwordFocusChangeHandler}
            ></input>
            {isLoading && <p className="form-copy">Loading</p>}
            {!isLoading && (
              <button
                className="form-button"
                type="submit"
                disabled={
                  passwordIsValid === true && emailIsvalid === true
                    ? false
                    : true
                }
              >
                {formButton}
              </button>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
