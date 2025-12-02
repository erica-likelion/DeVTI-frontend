import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  gap: 2.5rem;
`;

export const TextWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
`;

export const QuestionHeader = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
  margin: 0;
  align-self: flex-start;
  width: 100%;
`;

export const QuestionText = styled.p`
  ${({ theme }) => theme.fonts.body.l500}
  color: ${({ theme }) => theme.colors.grayScale.black};
  margin: 0;
  line-height: 1.6;
  width: 100%;
`;

export const LikertScale = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('M')}
  width: 100%;
  justify-content: space-between;
  padding: 0;
`;

export const LeftLabel = styled.span`
  ${({ theme }) => theme.fonts.heading.h4}
  color: ${({ theme }) => theme.colors.grayScale.black};
  display: flex;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RightLabel = styled.span`
  ${({ theme }) => theme.fonts.heading.h4}
  color: ${({ theme }) => theme.colors.grayScale.black};
  display: flex;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('M')}
`;