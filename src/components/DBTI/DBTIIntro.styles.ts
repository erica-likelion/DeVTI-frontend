import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  margin: 0;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1}
  color: ${({ theme }) => theme.colors.grayScale.black};
  margin: 0;
  text-align: center;
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.body.l500}
  color: ${({ theme }) => theme.colors.grayScale.gray500};
  margin: 0;
  text-align: center;
`;

export const TextWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2.5rem;
  
`;

export const ImageWrapper = styled.div`
  width: 17rem;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray100};
  
  ${({ theme }) => theme.media.wide} {
    width: 18%;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 23%;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 38%;
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: 70%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;