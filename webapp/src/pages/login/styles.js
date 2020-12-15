import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 630px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #222;
  font-weight: 400;
  text-align: center;
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 24px;
    a {
      color: #4bcc63;
      text-decoration: none;
      font-weight: 600;
    }
  }
`;
