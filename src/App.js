import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Home from "views/Home/Home"
import LoginPage from "views/LoginPage/LoginPage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import history from './history';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Switch>
          <Route path="/home" render={props => <Home {...props} />} />
          <Route
            path="/landing-page"
            render={props => <LandingPage {...props} />}
          />
          <Route
            path="/profile-page"
            render={props => <ProfilePage {...props} />}
          />
          <Route
            path="/login-page"
            render={props => <LoginPage {...props} />}
          />
          <Redirect to="/home" />
          <Redirect from="/" to="/home" />
        </Switch>
      </Switch>
    </Router>
  );
}