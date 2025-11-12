import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1.25rem;
  overflow: hidden;
  background: transparent;
  
  ${theme.media.mobile} {
    padding: 1rem 0;
  }
`;

export const CardFrame = styled.section`
  display: flex;
  width: 71.5rem;
  padding: 5rem 0;
  margin-top: -6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.25rem;
  border-radius: 3.75rem;
  background: ${theme.colors.inner.gl100.background};
  backdrop-filter: ${theme.colors.inner.gl100.backdropFilter};
  box-shadow: ${theme.colors.inner.gl100.boxShadow};
  border: 0.0625rem solid ${theme.colors.grayScale.white};

  ${theme.media.tablet} {
    width: 95%;
    padding: 4rem 1.5rem;
    gap: 4rem;
    border-radius: 2.5rem;
  }

  ${theme.media.mobile} {
    width: 95%;
    padding: 3rem 1rem;
    gap: 3rem;
    border-radius: 2rem;
    margin-top: -3rem;
  }


`;

export const TitleSection = styled.section`
display: flex;
padding:0;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 2rem;

`;

export const Title = styled.h1`
  ${theme.fonts.heading.Extra}
  color: ${theme.colors.grayScale.black};
  text-align: center;

`;

export const Subtitle = styled.p`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  text-align: center;

`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  
  ${theme.media.mobile} {
    width: 100%;
  }
`;


