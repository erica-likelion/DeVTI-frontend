import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-height: 50vh;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;