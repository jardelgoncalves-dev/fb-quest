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

export const CreateExamButton = styled.button`
  height: 80px;
  width: 100%;
  border: 2px dashed #a9a9a9;
  border-radius: 8px;
  background-color: #a9a9a91a;
  font-size: 17px;
  font-weight: 600;
  color: #a9a9a9;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4bcc63;
    color: #4bcc63;
    background-color: #4bcc631a
  }
`;

export const ExamItems = styled.button`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin: 10px;
  border: 2px solid #132;
  color: #132;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;

  &:hover {
    background-color: #132;
    color: #fff;
  }

`;
