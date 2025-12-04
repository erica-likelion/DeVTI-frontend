// src/pages/Room/Room.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
  flex-direction: column;
	align-items: center;
	gap: 3.75rem;
	align-self: stretch;
	overflow-y: auto;
  padding: 9.5rem ${({ theme }) => theme.responsive.gap('GeneralMargin')} 5rem	${({ theme }) => theme.responsive.gap('GeneralMargin')};
`;

export const TopSection = styled.section`
	display: flex;
	flex-direction: column;
  align-items: center;
	gap: 0.5rem;
`;

export const Title = styled.h2`
  font: ${props => props.theme.fonts.heading.h1};
	color: ${props => props.theme.colors.grayScale.black};
`;

export const CountdownText = styled.p`
	font: ${props => props.theme.fonts.heading.Extra};
	color: ${props => props.theme.colors.secondary.VT700};
`;

export const SubTitle = styled.p`
  font: ${props => props.theme.fonts.body.m500};
	color: ${props => props.theme.colors.grayScale.black};
`;

export const AISection = styled.section`
  display: flex;
	${({ theme }) => theme.responsive.property.width('max')}
	flex-direction: column;
	align-items: flex-start;
	gap: 0.75rem;
`;

export const AISectionHeader = styled.div`
  font: ${props => props.theme.fonts.heading.h3};
	color: ${props => props.theme.colors.grayScale.black};
`;

export const AITitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;
export const MidSection = styled.section`
  display: flex;
	padding: 0rem ${({ theme }) => theme.responsive.gap('S')};
	justify-content: space-between;
	align-self: stretch;
	align-items: center;
`;

export const ListSection = styled.section``;

export const ListHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TotalCount = styled.span`
  font: ${props => props.theme.fonts.body.m500};
	color: ${props => props.theme.colors.grayScale.black};
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
