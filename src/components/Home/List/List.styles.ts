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
  gap: 1.25rem;
  white-space: pre-line;
  line-height: 1.75rem;
`;

export const ItemContent = styled.div`
  display: flex;
  width: 33rem;
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.black};
`;

export const ItemButton = styled.div`
  display: flex;
  align-items: center;
`;