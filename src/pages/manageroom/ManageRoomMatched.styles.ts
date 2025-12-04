// Room.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
	align-self: stretch;

  padding: 5rem ${({ theme }) => theme.responsive.gap('GeneralMargin')} 5rem	${({ theme }) => theme.responsive.gap('GeneralMargin')};
  gap: 3.75rem;

	overflow-y: auto;
`;

/* ---------- Top Area ---------- */

export const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
	align-self: stretch;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
	align-self: flex-start;
  gap: 0.5rem;

	${({ theme }) => theme.fonts.heading.h2};
`;

export const Title = styled.h1`
	color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary.VT700};
`;

/* ---------- Segment Area ---------- */



// 임시 세그먼트 버튼 – 나중에 실제 컴포넌트로 교체
export const DummySegmentButton = styled.button`
  ${({ theme }) => theme.fonts.body.m500};
  padding: 0.5rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.colors.transparents.WH200};
`;

/* ---------- List Area ---------- */

export const ListArea = styled.section`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
	gap: 3.75rem;
	align-self: stretch;
	flex-wrap: wrap;

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

