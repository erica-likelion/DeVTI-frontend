import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.transparents.BL200};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Container = styled.div`
  display: flex;
  width: ${({ theme }) => theme.overlaySheets.width.wide};
  height: 37.5rem;
  ${({ theme }) => theme.responsive.property.paddingComplex('R', 'R', 'XL', 'R')};
  ${({ theme }) => theme.responsive.property.borderRadius('round')};
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.grayScale.white};
  position: relative;

  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.overlaySheets.width.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    width: ${({ theme }) => theme.overlaySheets.width.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.overlaySheets.width.mobile};
  }
`;

export const ButtonFrame = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  
  

  button{
    ${({ theme }) => theme.responsive.property.padding('XXS')}
    
    img{
      width: 1.03rem; 
      height: 1.03rem;
    }
  
  }
  
`;


export const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
  margin: 0;
`;

export const ContentFrame = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-height: 0;
`;

export const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  min-height: 0;
`;

export const BottomFrame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 1.25rem;
  position: relative;

  
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RightSection = styled.div`
  position: absolute;
  right: 0;
`;


