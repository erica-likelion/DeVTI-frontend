// src/pages/Room/Room.styles.ts
import styled from 'styled-components';

export const SideSheet = styled.div`
  display: flex;
	${({ theme }) => theme.responsive.property.overlaySheetsWidth()};
	flex-direction: column;
	align-items: flex-start;
	gap: 1.25rem;
	background-color: ${props => props.theme.colors.grayScale.white};
  z-index: 99999;
	overflow-y: auto;
`;

export const Nav = styled.div`
  display: flex;
	${({ theme }) => theme.responsive.property.overlaySheetsWidth()};
	padding: 0.75rem ${({ theme }) => theme.responsive.gap('GeneralMargin')};
	align-items: center;
  
`;

export const icon = styled.button`
	display: flex;
	${({ theme }) => theme.responsive.property.padding("XXS")};
	justify-content: center;
	align-items: center;
	${props => props.theme.colors.grayScale.white};
	${props => props.theme.responsive.property.borderRadius('sharp')};

`



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
  padding: 0rem ${({ theme }) => theme.responsive.gap('GeneralMargin')};
`;


export const ProfileSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	align-self: stretch;

`

export const ProfileImg = styled.img`
	width: 7.5rem;
	height: 7.5rem;
	aspect-ratio: 1/1;
	border-radius: 6.25rem;
	${({theme}) => theme.colors.inner.GL100}
`

export const SmallIcon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	aspect-ratio: 1/1;
`

export const Title = styled.div`
	color: ${props => props.theme.colors.grayScale.black};
	font: ${props => props.theme.fonts.heading.h2};
`

export const SubTitle = styled.div`
	color: ${props => props.theme.colors.grayScale.black};
	font: ${props => props.theme.fonts.heading.h4};
`

export const Devti = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`

export const PRSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.75rem;
	align-self: stretch;
`

export const KeywordArea = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`

export const Devider = styled.div`
	display: flex;
	padding: 0.25rem 0.125rem;
	align-items: center;
	gap: 0.625rem;
	align-self: stretch;
`

export const ContentSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 2.75rem;
	align-self: stretch;
`

export const InputfieldArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	align-self: stretch;
`

export const BlankFrame = styled.div`
	height: 6.25rem;
	align-self: stretch;
`



export const TimeRowContainer = styled.div`
	display: flex;
	padding: 0rem 0.75rem;
	align-items: center;
	gap: 7.5rem;
	align-self: stretch;
`


export const TimeFrame = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`


export const Timelabel = styled.div`
	color: ${props => props.theme.colors.grayScale.black};
	font: ${props => props.theme.fonts.heading.h3};
`

export const ScoreArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
`

export const EmptyText = styled.span`
  font: ${props => props.theme.fonts.body.l500};
  color: ${props => props.theme.colors.grayScale.gray700};
`;

export const DevelopArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	gap; 1.5rem;
`

export const LanguageFrame = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	gap; 1.25rem;
`