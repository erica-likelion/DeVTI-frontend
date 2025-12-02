import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.responsive.property.gap('XXS')};
`;

export const ProgressCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.responsive.property.gap('XXS')};
`;


export const ProgressText = styled.span`
  ${({ theme }) => theme.fonts.body.r500}
  color: ${({ theme }) => theme.colors.grayScale.gray700};
`;