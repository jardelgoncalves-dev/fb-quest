import React from 'react';
import { Wrapper } from './styles';

export const Input = ({ value, placeholder, name, type = 'text', onChange }) => (
  <Wrapper
    onChange={onChange}
    value={value}
    name={name}
    placeholder={placeholder}
    type={type}
  />
)
