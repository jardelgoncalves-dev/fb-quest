import styled from 'styled-components';

export const Wrapper = styled.button`
  height: 64px;
  width: ${({ width }) => width || '200px'};
  border-radius: 8px;
  background-color: ${({ bg }) => bg || '#4bcc63'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0;
  cursor: pointer;

  font-size: 16px;
  color: #fff;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }

  :disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;
