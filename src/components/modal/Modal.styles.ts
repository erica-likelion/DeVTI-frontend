import styled from "styled-components";

export const Dimmed = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.transparents.BL200};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.responsive.property.overlayModalWidth()};
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  background: ${({ theme }) => theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius("sharp")}
  
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
  }
`;

export const ContentWrapper = styled.div`
  text-align: center;
	
`;

export const Body = styled.div`
	display: flex;             
  flex-direction: column;     
	gap: 0.5rem;

  font: ${({ theme }) => theme.fonts.heading.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};

`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PrimaryButton = styled.button`
  min-width: 200px;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 999px;
  border: none;
  background: #000;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;
