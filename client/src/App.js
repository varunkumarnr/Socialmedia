import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/layout/HomePage";
import Navbar from "./Components/layout/Navbar";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import Alert from "./Components/layout/alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./util/SetAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./Components/dashboard/Dashboard";
import PrivateRoute from "./Components/routing/PrivateRoute";
import "./App.css";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
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
              <PrivateRoute
                path='/dashboard'
                component={Dashboard}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
