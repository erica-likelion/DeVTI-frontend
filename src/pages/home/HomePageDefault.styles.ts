import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.responsive.property.gap('XXL')}
  ${({ theme }) => theme.responsive.property.width('max')}
  height: 100%;
  overflow: hidden;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.heading.h2}
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  width: 100%;
  height: calc(100vh - 8rem);
  overflow-y: auto;
  ${({ theme }) => theme.responsive.property.gap('L')}
  background-color: ${({ theme }) => theme.colors.grayScale.black};
  
  ${({ theme }) => theme.responsive.property.padding('XXL')}
  ${({ theme }) => theme.responsive.property.borderRadius('smooth')}
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  
  ${({ theme }) => theme.responsive.property.gap('L')}
  ${({ theme }) => theme.responsive.property.padding('L')}
  ${({ theme }) => theme.responsive.property.borderRadius('smooth')}

  h2 {
    ${({ theme }) => theme.fonts.heading.h2}
    color: ${({ theme }) => theme.colors.grayScale.black};
    margin: 0;
    text-align: center;
  }
`;

export const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.responsive.property.gap('M')}
  width: 100%;
  align-items: flex-start;
`;

export const InputTestSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  
  ${({ theme }) => theme.responsive.property.gap('L')}
  ${({ theme }) => theme.responsive.property.padding('L')}
  ${({ theme }) => theme.responsive.property.borderRadius('smooth')}

  h2 {
    ${({ theme }) => theme.fonts.heading.h2}
    color: ${({ theme }) => theme.colors.grayScale.black};
    margin: 0;
    text-align: center;
  }
`;

export const InputGrid = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.responsive.property.gap('M')}
  width: 100%;
`;
