// src/components/Input/InputField.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.responsive.gap('S')} ${({ theme }) => theme.responsive.gap('M')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.responsive.gap('S')};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.colors.transparents.BL100};
  ${({ theme }) => theme.responsive.property.borderRadius('smooth')}
`;


export const TextBox = styled.div`
  ${({ theme }) => theme.fonts.body.l500}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;
