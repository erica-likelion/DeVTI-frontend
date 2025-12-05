import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  currentPage: number;
}

export default function ProgressBar({ currentPage }: ProgressBarProps) {
  const progress = [0, 25, 50, 75][currentPage] || 0;
  const stepText = ['달려볼까요?', '파이팅! 잘 하고 있어요!', '내 DBTI는 무엇일까요?', '야호! 마지막 페이지!'][currentPage] || '시작';
  
  const renderProgressSVG = () => {
    const strokeOffset = [50.22, 37.7, 25.14, 12.57][currentPage] || 50.22; // 0%, 25%, 50%, 75%
    
    return (
      // 디자인 파일대로 구현이 어려워서 임시로 로딩 svg 구현
      <svg width="20" height="20" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6CC8C2" />
            <stop offset="100%" stopColor="#973EE9" />
          </linearGradient>
        </defs>
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="50.27"
          strokeDashoffset={strokeOffset}
          transform="rotate(-90 10 10)"
        />
      </svg>
    );
  };
  
  return (
    <S.Container>
      <S.ProgressCircle>
        {renderProgressSVG()}
      </S.ProgressCircle>
      <S.TextWrapper>
        <S.ProgressText>{progress}%..</S.ProgressText>
        <S.ProgressText>{stepText}</S.ProgressText>
      </S.TextWrapper>
    </S.Container>
  );
}