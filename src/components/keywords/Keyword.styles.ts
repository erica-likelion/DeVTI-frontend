import styled from 'styled-components';

export const Container = styled.div<{ color: string; isSingle: boolean; size: string }>`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXXS', 'XXS', 'XXXS', 'XXS')}
  
  width: auto;
  height: auto;

  ${({ theme }) => theme.responsive.property.borderRadius('hard')}
  background-color: ${({ color, theme }) =>
  color === 'green'
    ? theme.colors.secondary.MT100
    : theme.colors.secondary.VT100};

  ${({ size, theme }) => (size === 's' ? theme.fonts.body.r500 : theme.fonts.body.m500)};
  color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

export const Text = styled.span<{ divide?: boolean; size: string }>`
  position: relative;

  ${({ divide, size, theme }) =>
    divide &&
    `
      padding-right: ${theme.responsive.gap('XXS')};
      margin-right: ${theme.responsive.gap('XXS')};

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        
       
        border-radius: ${theme.responsive.borderRadius('hard')};
        height: ${(size === 's' ? '1rem' : '1.25rem')};
        background-color: ${theme.colors.primary.MT400};
      }
    `};
`;

