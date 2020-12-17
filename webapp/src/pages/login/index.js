import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { removeUserAndToken, setUserAndToken } from '../../services/auth';

import { Input, Button, ErrorMessage, Layout } from '../../components';
import { Container, Title, Footer } from './styles';


export const Login = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(null);

  useEffect(() => {
    checkLogged()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const checkLogged = async () => {
    try {
      await api.get('/users/me')
      history.push('/home')

    } catch(err) {
      removeUserAndToken()
    }
  }

  const onInputChange = (e) => {
    const { name, value } = e.target
    setState(old => ({
      ...old,
      [name]: value
    }))
  }

  const login = async () => {
    try {
      setError(null)
      const response = await  api.post('/auth', state);
      history.push('/home')
      setUserAndToken(response.data.token, response.data.user)
    } catch(error) {
      setError(error)
    }
  }

  return (
    <Layout
      vertical="center"
      horizontal="center"
>
      <Container>
        <Title>Faça login para continuar</Title>
        <ErrorMessage error={error} />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          onChange={onInputChange}
        />

        <Input
          placeholder="Senha"
          type="password"
          name="password"
          onChange={onInputChange}
        />
        <Footer>
          <Button
            onClick={login}
            text="Entrar"
            disabled={!!(!state.email || !state.password)}
          />
          <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
        </Footer>
      </Container>
    </Layout>
  )
}
