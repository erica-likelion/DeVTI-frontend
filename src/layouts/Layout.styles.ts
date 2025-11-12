import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  
  ${({ theme }) => theme.media.mobile} {
    min-height: 100vh;
  }
  
  ${({ theme }) => theme.media.tablet} {
    min-height: 100vh;
  }
  
  ${({ theme }) => theme.media.desktop} {
    max-width: 90rem;
    margin: 0 auto;
  }
  
  ${({ theme }) => theme.media.wide} {
    max-width: 120rem;
    margin: 0 auto;
  }
`;

export const Main = styled.main`
  flex: 1;
  overflow: hidden;
  padding-top: 4rem;
  padding-bottom: 4rem;
  
  ${({ theme }) => theme.media.mobile} {
    padding-top: 3.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 3rem;
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding-top: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 4rem;
  }
  
  ${({ theme }) => theme.media.desktop} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  ${({ theme }) => theme.media.wide} {
    padding-left: 0.62rem;
  }
`;