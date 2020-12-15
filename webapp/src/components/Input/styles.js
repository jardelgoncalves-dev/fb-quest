import styled from 'styled-components';

export const Wrapper = styled.input`
  height: 64px;
  width: 100%;
  outline: 0;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid #c9c9c9;
  padding: 0 12px;
  display: flex;
  align-items: center;
  margin: 12px 0;

  font-size: 16px;
  color: #222;

  &:focus {
    transition: all 0.05s;
    border: 2px solid #4bcc63;
  }
`;
