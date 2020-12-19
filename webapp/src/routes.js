import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ProtectedRouter } from './ProtectedRouter'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { Exam } from './pages/exam'

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={() => <h1>register</h1>} />
      <ProtectedRouter path="/home" component={Home} />
      <ProtectedRouter path="/exam/:id" component={Exam} />
    </Switch>
  </Router>
)
