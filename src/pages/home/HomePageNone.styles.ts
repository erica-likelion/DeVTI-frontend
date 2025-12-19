import styled from 'styled-components';

export const Container = styled.div`
  gap: 5rem;
  ${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 3.75rem 0;
  flex-direction: column;
  align-items: center;
`;
