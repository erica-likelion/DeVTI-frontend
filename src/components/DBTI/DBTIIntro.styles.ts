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
  
`;

export const ImageWrapper = styled.div`
  width: 266px;
  height: 266px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray100};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;