import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 5rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const RoomName = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
`;

export const TitleText = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.75rem;
`;

export const InputWrapper = styled.div`
${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 0;
`;

export const Label = styled.h3`
  ${({ theme }) => theme.fonts.heading.h3}
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.responsive.property.width('min')};
`;

export const Input = styled.div`
  min-width: 33.25rem;
  
  ${({ theme }) => theme.media.mobile} {
    min-width: 14.4375rem;
  }

  ${({ theme }) => theme.media.tablet} {
    min-width: 32rem;
  }
`;




