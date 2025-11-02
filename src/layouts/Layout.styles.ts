import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
`;

export const Main = styled.main`
  flex: 1;
  overflow: hidden;
  padding-bottom: 4rem;
`;