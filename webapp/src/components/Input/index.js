import React from 'react';
import { Wrapper } from './styles';

export const Input = ({ value, placeholder, name, type = 'text' }) => (
  <Wrapper
    value={value}
    name={name}
    placeholder={placeholder}
    type={type}
  />
)
