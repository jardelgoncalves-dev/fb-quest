import React, { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import history from '../../history';
import api from '../../services/api';

import { ErrorMessage, Layout,Button } from '../../components'
import { Container, Items, ContinueContainer, ResolutionContainer,CorretingContainer, Finished } from './styles'
import { Link } from 'react-router-dom';

export const Exam = ({ computedMatch }) => {
  const [exam, setExam] = useState(null)
  const [questionId, setQuestionId] = useState(null)
  const [question, setQuestion] = useState(null)
  const [questionFinished, setQuestionFinished] = useState(false)
  const [myResponse, setMyResponse] = useState(null)
  const [myAlternativa, setMyAlternativa] = useState(null)
  const [error, setError] = useState(null)
  const [resolution, setResolution] = useState(false)

  useEffect(() => {
    if(computedMatch && computedMatch.params && !computedMatch.params.id) {
      history.go('/home')
    }
  }, [computedMatch])

  useEffect(() => {
    getExam()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getQuestion()
  }, [questionId]) // eslint-disable-line react-hooks/exhaustive-deps

  const getExam = async () => {
    try {
      setError(null)
      const {data} = await api.get(`/exams/${computedMatch.params.id}`)

      if (data.status !== 'INICIADO') {
        setExam(data)
        setQuestionFinished(true)
        return;
      }

      let lastQuestion = data.questoes[0]
      if (data.ultimaQuestao) {
        const indexLastQuestion = data.questoes.findIndex((question) => data.ultimaQuestao === question)
        if (indexLastQuestion !== -1 && indexLastQuestion !== (data.questoes.length -1)) {
          lastQuestion = data.questoes[indexLastQuestion + 1]
        }
      }
      setQuestionId(lastQuestion)
      setExam(data)
      console.log(data)
    } catch (error) {
      setError(error)
    }
  }

  const getQuestion = async () => {
    try {
      setError(null)
      if(!questionId) return null;
      const {data} = await api.get(`/questions/${questionId}`)
      setQuestion(data)
      console.log('questao', data)
    } catch(error) {
      setError(error)
    }
  }

  const markQuestion = async (response) => {
    setMyAlternativa(response)
    try {
      setError(null)
      const { id } = computedMatch.params

      const {data} = await api.get(`/exams/${id}/questao/${question.id}/alternativa/${response.id}/verifica`);
      setMyResponse(data)
    } catch (error) {
      setError(error)

    }
    console.log(response)
  }


  const classes = (alternativa) => {
    if(!myResponse || !myAlternativa) return;

    if (myResponse && myAlternativa && myAlternativa.letra === alternativa.letra && myResponse.correta)
      return '--correta'
    if (myResponse && myAlternativa && myAlternativa.letra === alternativa.letra && !myResponse.correta)
      return '--errada'
  }

  const resolutionToggle = () => {
    setResolution(!resolution)
  }

  const nextQuestion = () => {
    setMyResponse(null)
    setMyAlternativa(null)
    setResolution(null)
    getExam();
  }

  return (
    <Layout
      horizontal="center"
    >
      <Container>
        {!questionFinished ? (
        <>
          <ErrorMessage error={error} />
          {question && (
            <>
            {renderHTML(question.enunciado)}
            {question.alternativas.map(alternativa => (
              <Items
                key={alternativa.letra}
                onClick={() => markQuestion(alternativa)}
                className={classes(alternativa)}
              >
                <span className="alternativa">{alternativa.letra}</span>
                {renderHTML(alternativa.texto)}
              </Items>
            ))}
            </>
          )}
          {myResponse && (
            <ContinueContainer>
              <Button text="Próxima" onClick={nextQuestion} />
              {myResponse && myResponse.correta === false &&
                <Button text="Resolução" bg="blue" onClick={resolutionToggle} />
              }
            </ContinueContainer>
          )}

          {resolution && myResponse.detalhes && (
            <>
            {myResponse.correta === false && (
              <CorretingContainer>
                <span className="alternativa">{myResponse.detalhes.alternativa.letra}</span>
                  {renderHTML(myResponse.detalhes.alternativa.texto)}
              </CorretingContainer>
            )}
            {myResponse.detalhes.resolucao && (
              <ResolutionContainer>
                {renderHTML(myResponse.detalhes.resolucao)}
              </ResolutionContainer>
            )}
            </>
          )}
          </>
        ): (
          <Finished>
            <h1>Quest concluído</h1>
            <p>Você teve <span className="acertos">{((exam.acertos || 0) / exam.questoes.length) * 100 }% </span>
            de acerto no Quest de {exam.nome} com um tempo gasto de
            <span className="bold"> {(exam.tempoGasto - exam.inicio) / 1000 } segundos</span></p>
            <Link to="/home">Voltar para a Home</Link>
          </Finished>

        )}
      </Container>
    </Layout>
  )
}
