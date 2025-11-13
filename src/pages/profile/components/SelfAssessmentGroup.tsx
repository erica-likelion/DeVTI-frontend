import * as S from "./SelfAssessmentGroup.styles";

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
}

export default function SelfAssessmentGroup({
  title,
  items,
  values,
  onChange,
}: SelfAssessmentGroupProps) {
  return (
    <S.Group>
      <S.GroupTitle>{title}</S.GroupTitle>
      <S.CardGrid>
        {items.map((item) => (
          <S.Card key={item.key}>
            <S.CardTitle>{item.title}</S.CardTitle>
            <S.CardDescription>{item.description}</S.CardDescription>
            <S.RatingGroup>
              {RATING_SCALE.map((label, index) => {
                const value = index + 1;
                const isActive = (values[item.key] ?? 0) === value;

                return (
                  <S.RatingOption key={label} $active={isActive}>
                    <S.HiddenRadio
                      name={item.key}
                      type="radio"
                      value={value}
                      checked={isActive}
                      onChange={() => onChange(item.key, value)}
                    />
                    <S.RatingCircle $active={isActive} />
                    <S.RatingLabelText>{label}</S.RatingLabelText>
                  </S.RatingOption>
                );
              })}
            </S.RatingGroup>
          </S.Card>
        ))}
      </S.CardGrid>
    </S.Group>
  );
}

