import React, { useState, useEffect } from "react";
import { AvForm } from "availity-reactstrap-validation";
// reactstrap components
import { InputGroup } from "reactstrap";
import Formsy from "formsy-react";
import {
  Card,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import classNames from "classnames";
import { isEqual } from "lodash";
import Input from "shared/components/Input/LoginInput";
import CustomButton from "shared/components/CustomButton/CustomButton";
import history from "../../../history";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../style/style";

const useStyles = makeStyles(styles);

function LoginForm({ login, googleAuth }) {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [disableControls, setDisableControls] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    if (localStorage.getItem("userName") !== null) {
      if (localStorage.getItem("userName").length !== 0) {
        const userName = rememberMe ? localStorage.getItem("userName") : "";
        setUserName(userName);
      }
    }
    if (localStorage.getItem("password") !== null) {
      if (localStorage.getItem("password").length !== 0) {
        const password = rememberMe ? localStorage.getItem("password") : "";
        setPassword(password);
      }
    }
    setRememberMe(isEqual(localStorage.getItem("rememberMe"), "true"));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    setDisableControls(true);
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("userName", rememberMe ? userName : "");
    localStorage.setItem("password", rememberMe ? password : "");
    login &&
      login({ username: userName, password: password }).finally(() => {
        setDisableControls(false);
      });
  };

  const handleGoogleAuth = () => {
    googleAuth();
  };

  return (
    <Card className={classes.LoginForm}>
      <CardContent className={classes.CardContent}>
        <div className={classes.LoginText}>Log in</div>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={() => setCanSubmit(true)}
          onInvalid={() => setCanSubmit(false)}
        >
          <AvForm>
            <InputGroup
              className={
                "no-border input-lg" + (firstFocus ? " input-group-focus" : "")
              }
            >
              <Input
                name="userName"
                placeholder="User Name"
                type="text"
                onChange={e => {
                  setUserName(e.target.value);
                }}
                validations={{
                  //
                  matchRegexp: /^[a-zA-Z0-9@/./+/-/_]+$/
                }}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter an userName"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9@/./+/-/_]+$/,
                    errorMessage:
                      "username contains only letters, numbers and special characters"
                  }
                }}
                value={userName}
                onFocus={() => setFirstFocus(true)}
                onBlur={() => setFirstFocus(false)}
                required
              ></Input>
            </InputGroup>
            <InputGroup
              className={
                "no-border input-lg" + (lastFocus ? " input-group-focus" : "")
              }
            >
              <Input
                name="password"
                placeholder="Password"
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                validations={{
                  // Regex for a password that is 8 digits long, with at least 1 number, 1 capital letter and /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
                  matchRegexp: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
                }}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter a password"
                  },
                  // Regex for a password that is 8 digits long, with at least 1 number, 1 capital letter and /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
                  pattern: {
                    value: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    errorMessage:
                      "Password 8 digits long at least and contains at least 1 special character, one number and one capital letter"
                  }
                }}
                value={password}
                onFocus={() => setLastFocus(true)}
                onBlur={() => setLastFocus(false)}
                required
              ></Input>
            </InputGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  value="checkedB"
                  style={{ color: "#4174FF" }}
                />
              }
              label="Remember Me"
              className={classes.RememberMe}
            />
          </AvForm>
          <div>
            <CustomButton
              disabled={!canSubmit}
              isLoading={disableControls}
              onClick={handleSubmit}
            >
              Log in
            </CustomButton>
          </div>
          <span className={classes.NewContent}>
            <Divider className={classes.divider} />
            <div className={classes.newText}>
              New to <span style={{ fontWeight: "bold" }}>Share With Me?</span>
            </div>
            <Divider className={classes.divider} />
          </span>
          <div style={{ marginTop: 10 }}>
            <CustomButton onClick={() => history.push("/signup")}>
              Sign up
            </CustomButton>
          </div>
        </Formsy>
        <div style={{ marginTop: 10 }}>
          <button
            className={classNames("ui red google button", classes.googleButton)}
            onClick={handleGoogleAuth}
          >
            <i className="google icon" />
            Sign In with google
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
