import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/layout/HomePage";
import { Navbar } from "./Components/layout/Navbar";
import "./App.css";
const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
      </Switch>
    </Fragment>
  </Router>
);
export default App;
