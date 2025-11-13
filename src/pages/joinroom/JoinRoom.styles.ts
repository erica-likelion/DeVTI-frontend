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