import React, { useEffect, useState } from 'react';
import { removeUserAndToken } from '../../services/auth';

import { Layout, ExamCard, ErrorMessage, Modal } from '../../components';
import { Container, Title, ExitButton, CreateExamButton, ExamItems } from './styles';
import history from '../../history';
import api from '../../services/api';


export const Home = () => {
  const [state, setState] = useState({
    exams: [],
    groups: [],
    exam: null,
  })
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getExams();
    getTemas()
  }, [])

  const logout = () => {
    removeUserAndToken()
    history.go('/')
  }

  const getTemas = async () => {
    try {
      setError(null)
      const response = await api.get('/group-questions');
      setState(old => ({
        ...old,
        groups: response.data
      }))
    } catch(error) {
      setError(error)
    }
  }

  const getExams = async () => {
    try {
      setError(null)
      const response = await api.get('/exams');
      setState(old => ({
        ...old,
        exams: response.data
      }))
      console.log(response)
    } catch(error) {
      setError(error)
    }
  }

  const createExams = async (group) => {
    try {
      setError(null)
      await api.post('/exams', [group]);
      getExams();
      setModal(false)
    } catch(error) {
      setError(error)
    }
  }


  return (
    <Layout
      horizontal="center"
    >
      <Container>
        <ExitButton onClick={logout}>Sair</ExitButton>
        <Title>Bem vindo de volta</Title>
        <ErrorMessage  error={error} />
        <CreateExamButton onClick={() => setModal(true)}>Realizar um novo teste</CreateExamButton>
        {state.exams.map(exam => (
          <ExamCard
            key={exam.id}
            titulo={exam.nome}
            questoes={exam.questoes}
            status={exam.status}
            acertos={exam.acertos}
            tempoFinal={exam.tempoGasto}
            tempoInicio={exam.inicio}
            href={`/exam/${exam.id}`}
          />
        ))}

      </Container>
      <Modal title="Realizar um novo teste" visible={modal} onClose={() => setModal(false)}>
        {state.groups.map(group => (
          <ExamItems key={group.nome} onClick={() => createExams(group)}>
            <span>{ group.nome }</span>
            <span>&gt;</span>
          </ExamItems>
        ))}
      </Modal>
    </Layout>
  )
}
