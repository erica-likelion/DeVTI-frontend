import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

export const Content = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: left;
  align-items: left;
  
  ${theme.media.mobile} {
    padding: 0.75rem 1rem;
  }
`;

export const CopyrightText = styled.p`
  ${theme.fonts.body.m500}
  color: ${theme.colors.grayScale.gray700};
  margin: 0;
  text-align: left;
`;