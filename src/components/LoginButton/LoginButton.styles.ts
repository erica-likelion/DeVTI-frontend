import styled from 'styled-components';

export const Container = styled.button`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'XXS', 'XS', 'XS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XS')}
  margin-left: ${({ theme }) => theme.responsive.gap('XS')};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  ${({ theme }) => theme.fonts.heading.h4};
  background: none;
  border: none;
  cursor: pointer;

  ${({ theme }) => theme.media.desktop} {
    margin-left: ${({ theme }) => theme.responsive.gap('XS', 'desktop')};
  }

  ${({ theme }) => theme.media.tablet} {
    margin-left: ${({ theme }) => theme.responsive.gap('XS', 'tablet')};
  }

  ${({ theme }) => theme.media.mobile} {
    margin-left: ${({ theme }) => theme.responsive.gap('XS', 'mobile')};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('S')}
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;