import * as S from "./SelfAssessmentGroup.styles";
import Card from "@/components/Card";

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
}

export default function SelfAssessmentGroup({
  title,
  items,
  values,
  onChange,
  variant = "input",
}: SelfAssessmentGroupProps) {
  return (
    <S.Group>
      {title && <S.GroupTitle>{title}</S.GroupTitle>}
      <S.CardGrid>
        {items.map((item) => (
          <S.CardWrapper key={item.key}>
            <Card
              header={item.title}
              body={item.description}
              score={values[item.key] ?? 0}
              variant={variant}
              onScoreChange={variant === "input" ? (score) => onChange(item.key, score) : undefined}
            />
          </S.CardWrapper>
        ))}
      </S.CardGrid>
    </S.Group>
  );
}

