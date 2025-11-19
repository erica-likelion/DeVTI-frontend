import styled from 'styled-components';

export const Container = styled.nav`
  position: fixed;
  width:100%;
  height: 4.5rem;
  z-index: 1000;
  ${({ theme }) => theme.responsive.property.gap('XXL')}
  
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
    padding: 1.38rem 2rem;
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding: 0 2rem;
  }
  
  ${({ theme }) => theme.media.desktop} {
    padding: 0 2rem;
  }
  
  ${({ theme }) => theme.media.wide} {
    padding: 1.37rem 2.5rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
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
  ${({ theme }) => theme.responsive.property.gap('XL')}
  
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const MobileRightSection = styled.div`
  display: none;
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.responsive.gap('XXL', 'mobile')};

  }
`;

