import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.grayScale.white};
  
  ${({ theme }) => theme.media.mobile} {
    padding-top: calc(3.5rem + 2rem);
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding: 1.5rem;
    padding-top: calc(4rem + 1.5rem);
  }
`;



export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1};
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
  margin-bottom: 0.5rem;
`;


export const SocialButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 5.5rem;
  
  ${({ theme }) => theme.media.mobile} {
    gap: 2.5rem;
  }
`;

