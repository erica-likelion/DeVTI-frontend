import styled from 'styled-components';

export const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 12.5rem;
`;



export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1};
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
`;


export const SocialButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.responsive.property.gap('XL')}
`;

