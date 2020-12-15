import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Login } from './pages/login'

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={() => <h1>register</h1>} />
      <Route path="/home" component={() => <h1>Hello home</h1>} />
    </Switch>
  </Router>
)
