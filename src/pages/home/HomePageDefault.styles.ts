import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  gap: 5rem;
  
  ${theme.layouts.mobileCommon}
  
  ${theme.media.tablet} {
    ${theme.layouts.tabletCommon}
  }
  
  ${theme.media.desktop} {
    ${theme.layouts.desktopCommon}
  }
  
  ${theme.media.wide} {
    ${theme.layouts.wideCommon}
  }
`;

export const Title = styled.h2`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  text-align: center;
`;

export const ListWrapper = styled.div`
  display: flex;
  width: 42.5rem;
  padding: 3.75rem 0;
  flex-direction: column;
  align-items: center;
`;
