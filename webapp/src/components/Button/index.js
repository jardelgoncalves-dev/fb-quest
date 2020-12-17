import React from 'react';
import { Wrapper } from './styles';

export const Button = ({ text, onClick, width, disabled }) => (
  <Wrapper
    onClick={onClick}
    width={width}
    disabled={disabled}
  >
    {text}
  </Wrapper>
)
