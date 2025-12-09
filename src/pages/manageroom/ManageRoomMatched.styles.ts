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