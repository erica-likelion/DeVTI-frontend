import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const LeftSection = styled.section`
  display: flex;
  ${({ theme }) => theme.responsive.property.width('medium')}
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  overflow-y: auto;
  order: 1;

  ${({ theme }) => theme.media.mobile} {
    order: 2;
    display: none;
  }
`;

export const RightSection = styled.section`
  background: ${({ theme }) => theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  height: 100%;
  order: 2;

  ${({ theme }) => theme.media.mobile} {
    order: 1;
    width: 100%;
  }
`;