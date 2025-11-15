import styled from 'styled-components';

export const Container = styled.div<{ color: string; isSingle: boolean; size: string }>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  
  width: auto;
  height: auto;

  border-radius: 0.5rem;;
  background-color: ${({ color, theme }) =>
  color === 'green'
    ? theme.colors.secondary.MT100
    : theme.colors.secondary.VT100};

  font-size: ${({ size, theme }) => (size === 's' ? theme.fonts.body.r500 : theme.fonts.body.m500)};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayScale.gray900};
`;

export const Text = styled.span<{ divide?: boolean; size: string }>`
  position: relative;

  ${({ divide, size, theme }) =>
    divide &&
    `
      padding-right: 0.5rem;
      margin-right: 0.5rem;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        border-radius: 0.25rem;
        height: ${(size === 's' ? '1rem' : '1.25rem')};
        background-color: ${theme.colors.primary.MT400};
      }
    `};
`;

