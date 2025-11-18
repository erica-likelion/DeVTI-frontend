import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  overflow: hidden;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.XXS.wide};
  white-space: pre-line;
  line-height: 1.75rem;
`;

export const ItemContent = styled.div`
  display: flex;
  width: ${theme.componentWidths.large.wide};
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.black};
  white-space: pre-line;
  word-wrap: break-word;

  ${theme.media.desktop} {
    width: ${theme.componentWidths.large.desktop};
  }

  ${theme.media.tablet} {
    width: ${theme.componentWidths.large.tablet};
  }

  ${theme.media.mobile} {
    width: ${theme.componentWidths.large.mobile};
    white-space: normal;
    word-break: break-word;
    line-height: 1.5;
  }
`;

export const ItemButton = styled.div`
  width: ${({ theme }) => theme.componentWidths.min.tablet};
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.gaps.XXS.tablet};
  flex-shrink: 0;
`;