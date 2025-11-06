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
  width: 17.5rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  z-index: 9999;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  box-shadow: -0.25rem 0 0.5rem rgba(0, 0, 0, 0.1);
  
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray200};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray50};
    border-radius: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem);
  padding: 1.5rem 1rem;
`;

export const UserSection = styled.div`
  padding: 1rem 0;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray200};
  margin-bottom: 1.5rem;
`;

export const MenuSection = styled.div`
  flex: 1;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 0.75rem;
  background: none;
  border: none;
  text-align: left;
  ${({ theme }) => theme.fonts.body.m500};
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borders.sharp};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray50};
  }
  
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const LoginSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
`;

export const LogoutSection = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray200};
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0.75rem;
  background: none;
  border: 0.0625rem solid ${({ theme }) => theme.colors.systems.error};
  color: ${({ theme }) => theme.colors.systems.error};
  ${({ theme }) => theme.fonts.body.m500};
  border-radius: ${({ theme }) => theme.borders.sharp};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.systems.error};
    color: ${({ theme }) => theme.colors.grayScale.white};
  }
`;