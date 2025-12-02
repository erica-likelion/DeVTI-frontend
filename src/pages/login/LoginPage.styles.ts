import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;



export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1};
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
  margin-bottom: 12.5rem;

  ${({ theme }) => theme.media.desktop} {
    margin-bottom: 5%;
  }

  ${({ theme }) => theme.media.tablet} {
    margin-bottom: 5%;
  }

`;


export const SocialButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.responsive.property.gap('XL')}
  margin-top: ${({ theme }) => theme.responsive.gap('XXL')};
`;

