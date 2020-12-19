import styled from 'styled-components';

export const Wrapper = styled.div`
  opacity: 0;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.2);
  transition: all 0.2s;

  &.--visible {
    display: block;
    opacity: 1;
  }
`;

export const Box = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 630px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
`;

export const BackButton = styled.button`
background-color: transparent;
  border: 1px solid #222;
  color: #222;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 16px;
  cursor: pointer;
  margin: 12px 0;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  color: #222;
  font-weight: 400;
  text-align: center;
  margin-bottom: 16px;
`;
