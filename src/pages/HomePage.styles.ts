import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  
  ${({ theme }) => theme.media.mobile} {
    padding: 1.5rem 1rem;
  }
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1}
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 1rem;
  text-align: center;
`;

export const Description = styled.p`
  ${({ theme }) => theme.fonts.body.large}
  color: ${({ theme }) => theme.colors.grayScale.gray600};
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;

export const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.grayScale.gray50};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  max-width: 400px;
  width: 100%;
  
  h3 {
    ${({ theme }) => theme.fonts.heading.h4}
    color: ${({ theme }) => theme.colors.grayScale.gray800};
    margin-bottom: 1rem;
  }
  
  p {
      ${({ theme }) => theme.fonts.body.medium}
      color: ${({ theme }) => theme.colors.grayScale.gray700};
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
  }
`;

export const Note = styled.div`
  ${({ theme }) => theme.fonts.body.small}
  color: ${({ theme }) => theme.colors.grayScale.gray500};
  text-align: center;
  font-style: italic;
`;