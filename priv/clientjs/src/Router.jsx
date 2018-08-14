import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from './Dashboard';
import PrivateRoute from './authentication/PrivateRoute';
import SignIn from './SignIn';
import SignOut from './authentication/SignOut';
import SignUp from './SignUp';
import RootRoute from './RootRoute';

const Router = () =>
  <Switch>
    <Route exact path="/" render={props => <RootRoute {...props} />} />
    <Route path="/sign_up" render={props => <SignUp {...props} />} />
    <Route path="/sign_in" render={props => <SignIn {...props} />} />
    <Route path="/sign_out" component={SignOut} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
  </Switch>;

export default Router;
