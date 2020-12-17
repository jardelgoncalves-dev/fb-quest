import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontal } ) => horizontal || 'flex-start'};
  justify-content: ${({ vertical }) => vertical || 'flex-start'};
  width: 100vw;
  height: 100vh;
`;

export const Layout = ({ horizontal, vertical, children }) => (
  <Wrapper
    horizontal={horizontal}
    vertical={vertical}
  >
    {children}
  </Wrapper>
)
