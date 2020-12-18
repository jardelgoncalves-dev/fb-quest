import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 400px;
  width: 100%;
  height: 200px;
  border: 1px solid #c9c9c9;
  border-radius: 16px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

  h1 {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 12px;
  }

  div {
    margin: 6px 0;
  }

  span {
    font-size: 16px;
    color: #222;
    &.bold {
      font-weight: 900;
      margin-left: 8px;
    }
  }

  button {
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 20px;
    color: #4bcc63;
    margin: 8px 0;
  }
`;
