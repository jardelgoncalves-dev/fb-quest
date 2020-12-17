import React from 'react'
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';


export const ProtectedRouter  = ({component: Component, ...rest}) => {
  return (
    isAuthenticated() ? <Component {...rest} /> : <Redirect to="/" />
  )
}
