// Room.styles.ts
import styled from 'styled-components';

/* ---------- List Area ---------- */

export const ListArea = styled.section`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	align-content: center;
	gap: 3.75rem;
	align-self: stretch;

`;

export const MemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
	align-items: flex-start;
	padding: ${({ theme }) => theme.responsive.gap('R')};
  gap: 1.25rem;

	border-radius: 2.25rem;
	background: ${({ theme }) => theme.colors.transparents.WH300};
`;


export const TeamArea = styled.div`
  display: flex;
  padding: 0 ${({ theme }) => theme.responsive.gap('S')};
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const TeamName = styled.h2`
  ${({ theme }) => theme.fonts.heading.h3};
`;

export const TeamSubTitle = styled.span`
  ${({ theme }) => theme.fonts.heading.h4};
  
`;

export const TextArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 0.75rem;
`;

export const Text = styled.p`
	${({ theme }) => theme.fonts.body.m500};
	color: ${({ theme }) => theme.colors.grayScale.black};
`;

