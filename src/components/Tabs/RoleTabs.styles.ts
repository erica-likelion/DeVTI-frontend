import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  padding-bottom: 0.5rem; /* indicator 공간 확보 */
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  position: relative;
  padding-bottom: 0.25rem;
  padding-top: 0.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background: none;
  border: none;

  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.m500};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary.VT500};
  }
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 0.25rem;
  background: ${({ theme }) => theme.colors.primary.VT500};

  transition: 0.25s ease;
`;
