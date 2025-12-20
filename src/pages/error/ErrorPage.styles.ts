import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.25rem;
  text-align: center;
  background-color: radial-gradient(74% 86.02% at 50% 96.76%, #ECDEF9 0%, #FCFCFF 100%);
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.h1};
  color: ${({ theme }) => theme.colors.grayScale.black};
  
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.body.m500};
  color: ${({ theme }) => theme.colors.grayScale.black};
  
`;

export const ImageWrapper = styled.div`
  
`;

export const ErrorImage = styled.img`
  ${({ theme }) => theme.responsive.property.width('small')};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;