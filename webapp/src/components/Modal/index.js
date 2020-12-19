import React from 'react';
import { Wrapper, Box, BackButton, Title } from './styles';

export const Modal = ({ children, title, onClose, visible, textClose="Voltar" }) => (
  <Wrapper className={visible && '--visible'}>
    <Box>
      <BackButton onClick={onClose}>{textClose}</BackButton>
      <Title>{title}</Title>
      {children}
    </Box>
  </Wrapper>
)
