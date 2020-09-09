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
import CreateProfile from "./Components/profile-form/CreateProfile";
import EditProfile from "./Components/profile-form/EditProfile";
import Expirence from "./Components/profile-form/Expirence";
import Profiles from "./Components/profiles/Profiles";
import Education from "./Components/profile-form/Education";
import Profile from "./Components/profile/Profile";
import Posts from "./Components/posts/Posts";
import Post from "./Components/post/Post";
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
              <Route path='/profiles' component={Profiles}></Route>
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute
                path='/dashboard'
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute path='/create-profile' component={CreateProfile} />
              <PrivateRoute path='/edit-profile' component={EditProfile} />
              <PrivateRoute path='/add-experience' component={Expirence} />
              <PrivateRoute path='/add-education' component={Education} />
              <PrivateRoute path='/posts' component={Posts} />
              <PrivateRoute path='/post/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
