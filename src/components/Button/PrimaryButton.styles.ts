import styled from 'styled-components';

// 버튼 반응형 정의 [완료- 이후 스타일만 수정]
export const StyledButton = styled.button`
  ${({ theme }) => theme.fonts.heading.h3}
  display: flex;
  width: 28rem;
  padding: 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.grayScale.black};
  color: ${({ theme }) => theme.colors.grayScale.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.sharp};

  
  
  ${({ theme }) => theme.media.wide} {
    display: flex;
    padding: 0.75rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.desktop} {
    display: flex;
    padding: 0.75rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: 20rem;
    padding: 0.75rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: 11.375rem;
    padding: 0.75rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;