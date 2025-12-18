import styled from 'styled-components';


export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 5rem;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.responsive.property.gap('XXS')};
  padding: 0;
`;

export const ItemContent = styled.div`
  ${({ theme }) => theme.fonts.body.l500}
  color: ${({ theme }) => theme.colors.grayScale.black};
  flex-shrink: 0;
  line-height: 1.75rem;
  white-space: pre-line;
  padding: 0;

  ${({ theme }) => theme.media.mobile} {
    white-space: pre-line;
    word-break: break-word;
    line-height: 1.5;
    max-width: 14.1875rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ContentLine = styled.span`
  ${({ theme }) => theme.fonts.body.l500}
  color: ${({ theme }) => theme.colors.grayScale.black};
  
  ${({ theme }) => theme.media.mobile} {
    max-width: 14.1875rem;
    word-break: break-word;
  }
`;

export const ItemButton = styled.div`
  ${({ theme }) => theme.responsive.property.width('min')};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;