import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/layout/HomePage";
import { Navbar } from "./Components/layout/Navbar";
import { Signup } from "./Components/auth/Signup";
import { Login } from "./Components/auth/Login";
import "./App.css";
const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <div className='container'>
          <Route path='/signup' component={Signup}></Route>
          <Route path='/login' component={Login}></Route>
        </div>
      </Switch>
    </Fragment>
  </Router>
);
export default App;
