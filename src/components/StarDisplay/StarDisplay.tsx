import * as S from "./StarDisplay.styles";

interface StarDisplayProps {
  value: number; // 0~5, 0.5 단위
}

/**
 * 평균 점수를 별로 표시하는 컴포넌트
 * @param value - 0~5 사이의 값, 0.5 단위로 내림됨 (예: 4.7 -> 4.5)
 */
export default function StarDisplay({ value }: StarDisplayProps) {
  // 0.5 단위로 내림
  const roundedValue = Math.floor(value * 2) / 2;
  
  // 전체 별 개수
  const fullStars = Math.floor(roundedValue);
  // 반쪽 별 여부
  const hasHalfStar = roundedValue % 1 !== 0;
  // 빈 별 개수
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <S.Container>
      <S.StarContainer>
        {/* 채워진 별 */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <S.Star key={`full-${index}`}>
            <img src="/star_filled_purple.svg" alt="Filled star" />
          </S.Star>
        ))}
        
        {/* 반쪽 별 */}
        {hasHalfStar && (
          <S.Star>
            <img src="/star_halffilled.svg" alt="Half filled star" />
          </S.Star>
        )}
        
        {/* 빈 별 */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <S.Star key={`empty-${index}`}>
            <img src="/star_unfilled.svg" alt="Empty star" />
          </S.Star>
        ))}
      </S.StarContainer>
      <S.ValueText>{roundedValue.toFixed(1)}</S.ValueText>
    </S.Container>
  );
}

