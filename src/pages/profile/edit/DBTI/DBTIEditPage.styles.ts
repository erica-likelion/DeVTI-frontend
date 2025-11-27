import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    position: relative;
    overflow: hidden;
  }
`;

export const LeftSection = styled.section<{ $isVisible: boolean }>`
  display: flex;
  ${({ theme }) => theme.responsive.property.width('medium')}
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  overflow-y: auto;

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateX(${({ $isVisible }) => $isVisible ? '0' : '-100vw'});
    transition: none;
  }
`;

export const RightSection = styled.section<{ $isVisible: boolean }>`
  background: ${({ theme }) => theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(${({ $isVisible }) => $isVisible ? '0' : '100%'});
  }
`;





