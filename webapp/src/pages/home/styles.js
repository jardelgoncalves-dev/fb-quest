import styled from "styled-components";

export const Container = styled.div`
  max-width: 630px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #222;
  font-weight: 400;
  text-align: center;
  margin-bottom: 16px;
`;

export const ExitButton = styled.button`
  background-color: transparent;
  border: 1px solid #e34040;
  color: #e34040;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 16px;
  cursor: pointer;
  margin: 12px 0;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: #e34040;
    color: #fff;
  }
`;
