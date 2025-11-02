import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background: ${theme.colors.grayScale.white};
  gap: 1.25rem;
  overflow: hidden;
  
  ${theme.media.mobile} {
    padding: 1rem;
  }
`;

export const HeroSection = styled.section`

`;

export const Title = styled.h1`
  ${theme.fonts.heading.Extra}
  color: ${theme.colors.grayScale.black};
  text-align: center;
  margin-bottom: 2rem;

`;

export const Subtitle = styled.p`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  text-align: center;
  margin-bottom: 12.5rem;

`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  ${theme.media.mobile} {
    width: 100%;
  }
`;


