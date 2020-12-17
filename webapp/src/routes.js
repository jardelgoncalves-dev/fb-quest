import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ProtectedRouter } from './ProtectedRouter'
import { Login } from './pages/login'
import { Home } from './pages/home'

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={() => <h1>register</h1>} />
      <ProtectedRouter path="/home" component={Home} />
    </Switch>
  </Router>
)
