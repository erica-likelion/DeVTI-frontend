import styled from 'styled-components';

export const Container = styled.div<{ $isInDefaultPage?: boolean }>`
  background: ${({ theme }) => theme.colors.grayScale.white};
  display: flex;
  width:100%;
  padding: ${({ $isInDefaultPage, theme }) => $isInDefaultPage ? '0' : `3.75rem ${theme.gaps.GeneralMargin.wide}`};
  flex-direction: column;
  align-items: flex-start;
  gap: 2.75rem;
  overflow-y: auto;
  height: 100%;

  ${({ theme }) => theme.media.desktop} {
    padding: ${({ $isInDefaultPage, theme }) => $isInDefaultPage ? '0' : `3.75rem ${theme.gaps.GeneralMargin.desktop}`};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ $isInDefaultPage, theme }) => $isInDefaultPage ? '0' : `3.75rem ${theme.gaps.GeneralMargin.tablet}`};
  }

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ $isInDefaultPage, theme }) => $isInDefaultPage ? '0' : `3.75rem ${theme.gaps.GeneralMargin.mobile}`};
  }
`;

export const TitleFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h1};
`;

export const ContentFrame = styled.div`
  display: flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('none', 'M', 'none', 'M')}
  align-items: flex-end;
  flex-direction: column;
  gap: 2.5rem;
  align-self: stretch;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ResultImageTextFrame = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 2.5rem;
    align-self: stretch;

    img {
      width: ${({ theme }) => theme.componentWidths.small.wide};
      height: ${({ theme }) => theme.componentWidths.small.wide};
      aspect-ratio: 1/1;
      background: ${({ theme }) => theme.colors.grayScale.gray100};

      ${({ theme }) => theme.media.desktop} {
        width: ${({ theme }) => theme.componentWidths.small.desktop};
        height: ${({ theme }) => theme.componentWidths.small.desktop};
      }

      ${({ theme }) => theme.media.tablet} {
        width: ${({ theme }) => theme.componentWidths.small.tablet};
        height: ${({ theme }) => theme.componentWidths.small.tablet};
      }

      ${({ theme }) => theme.media.mobile} {
        width: ${({ theme }) => theme.componentWidths.small.mobile};
        height: ${({ theme }) => theme.componentWidths.small.mobile};
      }
    }

    ${({ theme }) => theme.media.mobile} {
      flex-direction: column;
      align-items: flex-start;
      gap: 2.5rem;
    }

    ${({ theme }) => theme.media.tablet} {
      flex-direction: column;
      align-items: flex-start;
      gap: 2.5rem;
    }
`;

export const TextFrame = styled.div`
  display: flex;
  padding: 0.75rem 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  flex: 1 0 0;
`;

export const KeywordFrame = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TypeText = styled.h1`
  ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h2};
`;

export const InfoFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    align-self: stretch;
`;

export const ImageTextFrame = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 0.75rem;
    align-self: stretch;

    img{
      width: 3.75rem;
      height: 3.75rem;
      background: ${({ theme }) => theme.colors.grayScale.gray100};
    }
`;

export const Rightlabel = styled.h1`
  ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h4};
  ${({ theme }) => theme.responsive.property.width('min')}
`;

export const DetailTextFrame = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 0.75rem;

    ${({ theme }) => theme.media.mobile} {
      flex-direction: column;
    }

    ${({ theme }) => theme.media.tablet} {
      flex-direction: column;
    }
`;

export const BestieTextFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    align-items: flex-start;
    gap: 0.25rem;
`;

export const BestieWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.75rem;
    flex: 1 0 0;
`;

export const DetailText = styled.h1`
    ${({ theme }) => theme.colors.grayScale.black};
    ${({ theme }) => theme.fonts.heading.h4};
`;

export const BestieDetailText = styled.h1`
    ${({ theme }) => theme.colors.grayScale.black};
    ${({ theme }) => theme.fonts.body.r500};
`;

export const label = styled.h1`
  ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h4};
`;