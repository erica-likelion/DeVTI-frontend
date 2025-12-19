import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  height: 100%;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const InputArea = styled.div`
  ${({ theme }) => theme.responsive.property.width('large')}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.div`
  ${({ theme }) => theme.fonts.heading.h3}
  ${({ theme }) => theme.responsive.property.width('min')};
`;

export const Input = styled.div`
  width: 100%;
`;




