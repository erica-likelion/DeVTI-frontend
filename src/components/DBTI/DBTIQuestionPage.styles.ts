import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-height: 70vh;
  overflow-y: auto;
  margin-top: 1.25rem;
  width: 100%;
`;

export const QuestionWrapper = styled.div`
  scroll-margin-top: 2rem;
  padding: 0 ${({theme}) => theme.responsive.gap('CenterSheet')};

  ${({ theme }) => theme.media.mobile} {
    padding: 0 ${({ theme }) => theme.responsive.gap('CenterSheet', 'mobile')};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 0 ${({ theme }) => theme.responsive.gap('CenterSheet', 'tablet')};
  }

  
  ${({ theme }) => theme.media.desktop} {
    padding: 0 ${({ theme }) => theme.responsive.gap('CenterSheet', 'desktop')};
  }


`;