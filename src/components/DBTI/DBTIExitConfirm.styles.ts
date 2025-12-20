import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  margin-top: 2.5rem;
`;


export const CloseSubtitle = styled.p`
  ${({ theme }) => theme.fonts.body.l500}
  color: ${({ theme }) => theme.colors.grayScale.black};
  margin: 0;
  text-align: center;

  /* 데스크톱/태블릿: 두 번째 줄은 숨기고 첫 번째에 합치기 */
  &:nth-child(2) {
    ${({ theme }) => theme.media.tablet} {
      display: none;
    }
    ${({ theme }) => theme.media.desktop} {
      display: none;
    }
    ${({ theme }) => theme.media.wide} {
      display: none;
    }
  }

  &:first-child {
    ${({ theme }) => theme.media.tablet} {
      &::after {
        content: " 소중한 응답들이 저장되지 않아요!";
      }
    }
    ${({ theme }) => theme.media.desktop} {
      &::after {
        content: " 소중한 응답들이 저장되지 않아요!";
      }
    }
    ${({ theme }) => theme.media.wide} {
      &::after {
        content: " 소중한 응답들이 저장되지 않아요!";
      }
    }
  }
`;

export const TextWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
`;

export const ImageWrapper = styled.div`
  width:17rem;
  height: 17rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
