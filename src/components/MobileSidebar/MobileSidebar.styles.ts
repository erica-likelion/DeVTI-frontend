import styled from 'styled-components';

interface SidebarProps {
  $isOpen: boolean;
}

export const Overlay = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  z-index: 9998;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const Container = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  width: 15rem;
  height: 63rem;
  padding: 2rem ${({ theme }) => theme.gaps.GeneralMargin.wide};
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  z-index: 9999;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  
  ${({ theme }) => theme.media.desktop} {
    padding: 2rem ${({ theme }) => theme.gaps.GeneralMargin.desktop};
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding: 2rem ${({ theme }) => theme.gaps.GeneralMargin.tablet};
  }
  
  ${({ theme }) => theme.media.mobile} {
    padding: 2rem ${({ theme }) => theme.gaps.GeneralMargin.mobile};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MenuSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  justify-content: flex-start;
  
  button {
    justify-content: flex-start;
    text-align: left;
    width: 100%;
  }
`;


export const LoginSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
`;
