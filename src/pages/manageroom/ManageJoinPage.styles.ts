import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  height: 100%;
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
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  ${({ theme }) => theme.fonts.heading.h3};
  ${({ theme }) => theme.responsive.property.width('min')};
  flex-shrink: 0;
`;

export const Input = styled.div`
  width: 100%;
`;




