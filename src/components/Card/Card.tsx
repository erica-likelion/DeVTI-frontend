import * as S from "./Card.styles";
import Score from "@/components/Score";

interface CardProps {
  header: string;
  body: string;
  score?: number; // 0~5
  variant?: "input" | "output"; // output: non-interactive view
  onScoreChange?: (score: number) => void;
}

export default function Card({ header, body, score = 0, variant = "input", onScoreChange }: CardProps) {
  const isOutput = variant === "output";

  return (
    <S.Container>
      <S.Header>{header}</S.Header>
      <S.Content>
        <S.Body>{body}</S.Body>
        <S.Footer>
          <Score value={score} disabled={isOutput} onChange={isOutput ? undefined : onScoreChange} />
        </S.Footer>
      </S.Content>
    </S.Container>
  );
}
