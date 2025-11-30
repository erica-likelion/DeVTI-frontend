import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1}
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: pre-line;
  text-align: center;
  
`;


export const InputWrapper = styled.div`
  ${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0;
`;

export const Label = styled.div`
  ${({ theme }) => theme.fonts.heading.h3};
  ${({ theme }) => theme.responsive.property.width('min')};
`;

export const Input = styled.div`
  width: 100%;
`;




