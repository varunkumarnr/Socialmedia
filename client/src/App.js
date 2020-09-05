import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/layout/HomePage";
import { Navbar } from "./Components/layout/Navbar";
import Signup from "./Components/auth/Signup";
import { Login } from "./Components/auth/Login";
import Alert from "./Components/layout/alert";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />

        <Route exact path='/' component={HomePage}></Route>
        <section className='container'>
          <Alert />
          <Switch>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/login' component={Login}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
