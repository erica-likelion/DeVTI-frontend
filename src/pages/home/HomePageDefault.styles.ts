import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.responsive.property.gap('XXL')}
  ${({ theme }) => theme.responsive.property.width('max')}
  height: 100%;
  overflow: hidden;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
`;

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 3.75rem 0;
  flex-direction: column;
  align-items: center;
`;

