import React from 'react';
import { removeUserAndToken } from '../../services/auth';

import { Layout, ExamCard } from '../../components';
import { Container, Title, ExitButton } from './styles';
import history from '../../history';


export const Home = () => {

  const logout = () => {
    removeUserAndToken()
    history.go('/')
  }

  return (
    <Layout
      horizontal="center"
    >
      <Container>
        <ExitButton onClick={logout}>Sair</ExitButton>
        <Title>Bem vindo de volta</Title>
        <ExamCard />
        <ExamCard />
      </Container>
    </Layout>
  )
}
