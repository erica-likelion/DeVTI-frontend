import styled from 'styled-components';

export const Container = styled.div`
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

export const Label = styled.h3`
  ${({ theme }) => theme.fonts.heading.h3}
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.responsive.property.width('min')};
`;

export const Input = styled.div`
  width: 33.25rem;
`;




