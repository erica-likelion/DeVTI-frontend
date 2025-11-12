import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 17rem;
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
  margin-top: 12.5rem;
  
  ${({ theme }) => theme.media.mobile} {
    gap: 2.5rem;
  }
`;

