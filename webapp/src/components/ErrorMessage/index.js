import React from 'react';
import { Wrapper } from './styles';

export const ErrorMessage = ({ error }) => {
  const handlerError = (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    }
    return 'Erro interno'
  }
  return (
    error && <Wrapper>{ handlerError(error) }</Wrapper>
  )
}
