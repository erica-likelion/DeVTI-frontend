import { useState, useEffect } from "react";
import * as S from "./Score.styles";

interface ScoreProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export default function Score({ value = 0, onChange, disabled = false }: ScoreProps) {
  const [selectedScore, setSelectedScore] = useState(value);

  useEffect(() => {
    setSelectedScore(value);
  }, [value]);

  const handleStarClick = (index: number) => {
    if (disabled) return;
    const clickedScore = index + 1;
    // 같은 별을 다시 클릭하면 해당 별만 지워짐 (점수 -1)
    const newScore = selectedScore === clickedScore ? clickedScore - 1 : clickedScore;
    setSelectedScore(newScore);
    onChange?.(newScore);
  };

  return (
    <S.Container>
      <S.StarContainer>
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < selectedScore;
          return (
            <S.StarButton
              key={index}
              type="button"
              $isFilled={isFilled}
              $disabled={disabled}
              disabled={disabled}
              onClick={() => handleStarClick(index)}
            >
              <img
                src={isFilled ? "/star_filled_purple.svg" : "/star.svg"}
                alt={isFilled ? "Filled star" : "Empty star"}
              />
            </S.StarButton>
          );
        })}
      </S.StarContainer>
    </S.Container>
  );
}

