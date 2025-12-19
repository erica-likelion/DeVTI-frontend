import * as S from "./SelfAssessmentGroup.styles";
import Card from "@/components/Card";

// @ts-ignore - 사용 예정
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RATING_SCALE = [
  "매우 모름",
  "모름",
  "보통",
  "능숙함",
  "매우 능숙함",
] as const;

export interface SelfAssessmentItem {
  key: string;
  title: string;
  description: string;
}

interface SelfAssessmentGroupProps {
  title: string;
  items: SelfAssessmentItem[];
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
  variant?: "input" | "output";
  cardSize?: "M" | "L"; // M: Component Width/Medium, L: Component Width/Large
}

export default function SelfAssessmentGroup({
  title,
  items,
  values,
  onChange,
  variant = "input",
  cardSize = "M",
}: SelfAssessmentGroupProps) {
  return (
    <S.Group>
      {title && <S.GroupTitle>{title}</S.GroupTitle>}
      <S.CardGrid>
        {items
          .filter((item) => item && item.key)
          .map((item) => (
            <S.CardWrapper key={item.key} $cardSize={cardSize}>
              <Card
                header={item.title}
                body={item.description}
                score={(values && values[item.key]) ?? 0}
                variant={variant}
                size={cardSize}
                onScoreChange={variant === "input" ? (score) => onChange(item.key, score) : undefined}
              />
            </S.CardWrapper>
          ))}
      </S.CardGrid>
    </S.Group>
  );
}

