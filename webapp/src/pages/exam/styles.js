import styled from "styled-components";

export const Container = styled.div`
  max-width: 630px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const Items = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 12px;
  margin: 10px;
  border: 2px solid #132;
  color: #132;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;

  .alternativa {
    color: #4bcc63;
    font-weight: bold;
    margin-right: 12px;
  }

  &:hover {
    background-color: #132;
    color: #fff;
  }

  &.--correta {
    color: #4bcc63;
    border: 2px solid #4bcc63;

    &:hover {
    background-color: transparent;
    }
  }

  &.--errada {
    border: 2px solid #e34040;
    color: #e34040;

    &:hover {
    background-color: transparent;
    }
  }

`;

export const ContinueContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  align-items: center;
  justify-content: center;
`;


export const ResolutionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  align-items: center;
  justify-content: flex-start;
`;

export const CorretingContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 32px 0;
  align-items: center;
  justify-content: space-between;

  .alternativa {
    color: #4bcc63;
    font-weight: bold;
    margin-right: 12px;
  }
`;

export const Finished = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 16px;
    color: #222;
  }
  p {
    font-size: 17px;
    color: #222;

    .acerto {
      color: #4bcc63;
      font-weight: 900;
    }
    .bold {
      font-weight: 900;
    }
  }

  a {
    font-weight: 20px;
    color: #4bcc63;
    font-weight: 900;
  }
`;
