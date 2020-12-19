import React from 'react';
import { Wrapper } from './styles';

export const Button = ({ text, onClick, width, disabled, bg }) => (
  <Wrapper
    onClick={onClick}
    width={width}
    disabled={disabled}
    bg={bg}
  >
    {text}
  </Wrapper>
)
