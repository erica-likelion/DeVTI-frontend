import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
`;

export const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* TODO: 네비게이션 바 추가시 패딩 조정 */
  /* padding-bottom: 80px; */
  
  /* 스크롤바 숨김 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;