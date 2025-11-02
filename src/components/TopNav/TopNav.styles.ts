import styled from 'styled-components';

export const Container = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  height: 4.5rem;
  z-index: 1000;
  
  ${({ theme }) => theme.media.mobile} {
   padding: 0.62rem 0rem;
  }
`;

export const NavWrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  ${({ theme }) => theme.media.mobile} {
    padding: 1.38rem 1rem;
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding: 0 24px;
  }
  
  ${({ theme }) => theme.media.desktop} {
    max-width: 1440px;
    padding: 0 32px;
  }
  
  ${({ theme }) => theme.media.wide} {
    max-width: 1920px;
    padding: 0 40px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Logo = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  
  img {
    width: 8.0625rem;
    height: 1.75rem;
  }
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 12px;
  
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const MobileRightSection = styled.div`
  display: none;
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    ${({ theme }) => theme.fonts.body.m500};
    color: ${({ theme }) => theme.colors.grayScale.gray700};
    cursor: pointer;
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.borders.sharp};
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.grayScale.gray50};
    }
  }
`;

// NavButton을 모바일 메뉴로 사용할 때의 스타일
export const MobileNavButton = styled.div`
  .mobile-menu {
    ${({ theme }) => theme.media.mobile} {
      background: none;
      border: none;
      ${({ theme }) => theme.fonts.body.m500};
      color: ${({ theme }) => theme.colors.grayScale.gray700};
      padding: 8px 12px;
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.grayScale.gray50};
      }
    }
  }
`;