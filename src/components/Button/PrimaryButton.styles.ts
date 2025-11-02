import styled from 'styled-components';
import { theme } from '../../styles/theme';

// 버튼 반응형 정의 [완료- 이후 스타일만 수정]
export const StyledButton = styled.button`
  ${theme.fonts.body.m500}
  display: flex;
  width: 28rem;
  padding: 0.75rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.grayScale.gray300};
  color: ${theme.colors.grayScale.black};
  border: none;
  border-radius: ${theme.borders.sharp};

  
  
  ${theme.media.wide} {
    display: flex;
    width: 28rem;
    padding: 0.75rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  ${theme.media.desktop} {
    display: flex;
    width: 28rem;
    padding: 0.75rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  ${theme.media.tablet} {
    display: flex;
    width: 20rem;
    padding: 0.75rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  ${theme.media.mobile} {
    display: flex;
    width: 11.375rem;
    padding: 0.75rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;