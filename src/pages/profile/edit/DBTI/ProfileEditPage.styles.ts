import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  ${({ theme }) => theme.responsive.property.width('medium')}
  height: 100%;
  padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.wide} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.wide};

  ${({ theme }) => theme.media.desktop} {
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.desktop} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile};
  }
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(74% 86.02% at 50% 96.76%, #ECDEF9 0%, #FCFCFF 100%);
  overflow-y: auto;
`;

export const InfoSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    align-self: stretch;
`;

export const ImageButtonFrame = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: -1.25rem;
    align-self: stretch;
`;

export const Image = styled.div`
    img{
      width: 7.5rem;
      height: 7.5rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
    }
`;

export const EditIconButton = styled.div`
    position: absolute;
    bottom: 0;
    right: calc(50% - 3.75rem);

    button {
      width: 2.5rem;
      height: 2.5rem;
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
      object-fit: contain;
    }
`;

export const DBTIFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;

  button {
    border-radius: ${({ theme }) => theme.responsive.borderRadius('sharp')};
  }
`;

export const label = styled.h1`
  ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h4};
`;

export const PartFrame = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
`;

export const ButtonFrame = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.desktop} {
    padding-top: 2.5rem;
  } 

  ${({ theme }) => theme.media.tablet} {
    padding-top: 2.5rem;
  }

  ${({ theme }) => theme.media.mobile} {
    padding-top: 2.5rem;
  }
`;