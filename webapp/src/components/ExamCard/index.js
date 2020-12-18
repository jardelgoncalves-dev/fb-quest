import React from 'react';

import { Wrapper } from './styles'

export const ExamCard = ({
  titulo,
  questoes = [],
  acertos,
  status,
  onClick,
}) => (
  <Wrapper>
    <h1>{titulo}</h1>
    <div>
      <span>Quantidade de questões:</span>
      <span className="bold">{questoes.length}</span>
    </div>
    {status && status === 'FINALIZADO' && (
      <div>
        <span>Acerto:</span>
        <span className="bold">{(acertos || 0) / questoes.length * 100 }%</span>
      </div>
    )}
    {status && status === 'INICIADO' && (
      <button onClick={onClick}>Continuar</button>
    )}
  </Wrapper>
)
