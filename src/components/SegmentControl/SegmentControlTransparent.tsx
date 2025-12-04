import React, { useState } from "react";
import ClearMTextButton from "@/components/ButtonDynamic/ClearMTextButton";
import * as S from "./SegmentControlTransparent.styles";

interface SegmentControlTransparentProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function SegmentControl({
  options,
  value: controlledValue,
  onChange,
}: SegmentControlTransparentProps) {
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
      {options.map((option, index) => {
        const isSelected = selectedValue === option;
        return (
          <React.Fragment key={option}>
            <S.ButtonWrapper $isSelected={isSelected}>
              <ClearMTextButton
                onClick={() => handleChange(option)}
                className={isSelected ? "selected" : ""}
                selected={isSelected}
              >
                {option}
              </ClearMTextButton>
            </S.ButtonWrapper>
            {index < options.length - 1 && <S.Divider key={`divider-${index}`} />}
          </React.Fragment>
        );
      })}
    </S.Container>
  );
}
