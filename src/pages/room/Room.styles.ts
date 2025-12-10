// src/pages/Room/Room.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
  flex-direction: column;
	align-items: center;
	gap: 3.75rem;
	align-self: stretch;
	overflow-y: auto;
  padding: 5rem ${({ theme }) => theme.responsive.gap('GeneralMargin')} 5rem ${({ theme }) => theme.responsive.gap('GeneralMargin')};
	min-height: 63.75rem;
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
  display: flex;
	padding: 0 ${({ theme }) => theme.responsive.property.gap('S')};
	align-items: center;
	align-self: stretch;
	gap: 0.625rem;
`;

export const AITitle = styled.h3`
  font: ${props => props.theme.fonts.heading.h3};
	color: ${props => props.theme.colors.grayScale.black};
`;


export const ListSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1.25rem;
	width: ${({ theme }) => theme.responsive.property.width('max')};
	`;

export const ListHeaderRow = styled.div`
  display: flex;
	align-items: center;
	${({ theme }) => theme.responsive.property.gap('R')};
`;


export const MidSection = styled.section`
  display: flex;
	padding: 0 ${({ theme }) => theme.responsive.property.gap('S')};
	justify-content: space-between;
	align-self: stretch;
	align-items: center;
`;

export const TotalCount = styled.span`
  font: ${props => props.theme.fonts.body.m500};
	color: ${props => props.theme.colors.grayScale.black};
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
	align-items: flex-start;
  gap: 0.75rem;
`;


export const Temp = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 5rem;
`;