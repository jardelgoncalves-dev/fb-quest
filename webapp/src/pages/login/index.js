import React from 'react';
import {Link} from 'react-router-dom';

import { Input, Button } from '../../components';
import { Container, Wrapper, Title, Footer } from './styles';

export const Login = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Faça login para continuar</Title>
        <Input
          placeholder="Email"
          type="email"
        />

        <Input
          placeholder="Senha"
          type="password"
        />
        <Footer>
          <Button
            text="Entrar"
          />
          <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
        </Footer>
      </Container>
    </Wrapper>
  )
}
