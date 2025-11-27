import { useState } from "react";
import WtMTextButton from "@/components/ButtonStatic/WtMTextButton";
import * as S from "./SegmentControlTight.styles";

interface SegmentControlProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function SegmentControl({
  options,
  value: controlledValue,
  onChange,
}: SegmentControlProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    undefined
  );

  // controlled 또는 uncontrolled 모드 지원
  const selectedValue = controlledValue ?? internalValue;
  const handleChange = (option: string) => {
    // 이미 선택된 옵션을 다시 클릭해도 선택 유지 (중복 선택 방지)
    if (selectedValue === option) {
      return;
    }
    
    if (onChange) {
      onChange(option);
    } else {
      setInternalValue(option);
    }
  };

  return (
    <S.Container>
      {options.map((option) => {
        const isSelected = selectedValue === option;
        return (
          <S.ButtonWrapper key={option} $isSelected={isSelected}>
            <WtMTextButton
              onClick={() => handleChange(option)}
              className={isSelected ? "selected" : ""}
            >
              {option}
            </WtMTextButton>
          </S.ButtonWrapper>
        );
      })}
    </S.Container>
  );
}
