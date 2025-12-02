import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: transparent;
`;

export const CardFrame = styled.section`
  display: flex;
  ${({ theme }) => theme.responsive.property.width('max')}
  padding: 5rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.25rem;
  border-radius: 3.75rem;
  background: ${({ theme }) => theme.colors.inner.GL100.background};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.white};
`;

export const TitleSection = styled.section`
  display: flex;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('L')}

`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading.Extra}
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;

`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.heading.h1}
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;

`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;


