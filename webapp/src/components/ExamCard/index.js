import React from 'react';

import { Wrapper, Container } from './styles'

export const ExamCard = ({
  titulo,
  questoes = [],
  acertos,
  status,
  href,
  tempoFinal,
  tempoInicio
}) => (
  <Wrapper to={href}>
    <Container>
      <h1>{titulo}</h1>
      <div>
        <span>Quantidade de questões:</span>
        <span className="bold">{questoes.length}</span>
      </div>
      {status && status === 'FINALIZADO' && (
        <>
        <div>
          <span>Acerto:</span>
          <span className="bold">{(acertos || 0) / questoes.length * 100 }%</span>
        </div>
        <div>
        <span>Tempo gasto:</span>
        <span className="bold">{(tempoFinal - tempoInicio) / 1000 } segundos</span>
      </div>
      </>

      )}
      {status && status === 'INICIADO' && (
        <span className="status">Continuar</span>
      )}
    </Container>
  </Wrapper>
)
