import React from 'react';
import { Wrapper } from './styles';

export const Button = ({ text, onClick, width }) => (
  <Wrapper
    onClick={onClick}
    width={width}
  >
    {text}
  </Wrapper>
)
