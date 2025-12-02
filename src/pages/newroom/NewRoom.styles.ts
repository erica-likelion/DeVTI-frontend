import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 5rem;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const ListWrapper = styled.div`
  ${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.75rem;
`;

export const InputWrapper = styled.div`
  ${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 0;
`;

export const Label = styled.div`
  ${({ theme }) => theme.fonts.heading.h3}
  ${({ theme }) => theme.responsive.property.width('min')};
  margin: 0;
  padding:0;
`;

export const Input = styled.div`
  width: 100%;
`;




