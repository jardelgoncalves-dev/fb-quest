import React from 'react';
import { Redirect } from 'react-router-dom';
import { Wrapper } from './styles';

export const ErrorMessage = ({ error }) => {
  const handlerError = (error) => {
    if (error.response) {
      if(error.response.status && error.response.status === 401) {
        return <Redirect to="/" />
      }
      if (error.response.data && error.response.data.error) {
        return error.response.data.error
      }
    }
    return 'Erro interno'
  }
  return (
    error && <Wrapper>{ handlerError(error) }</Wrapper>
  )
}
