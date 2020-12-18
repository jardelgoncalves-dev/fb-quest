import React from 'react';
import { Wrapper, Box, BackButton, Title } from './styles';

export const Modal = ({ children, title, onClose, visible }) => (
  <Wrapper className={visible && '--visible'}>
    <Box>
      <BackButton onClick={onClose}>Voltar</BackButton>
      <Title>{title}</Title>
      {children}
    </Box>
  </Wrapper>
)
