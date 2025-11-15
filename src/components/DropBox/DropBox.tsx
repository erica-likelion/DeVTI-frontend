import * as S from "./DropBox.styles";

interface DropBoxProps {
  value?: string;
  placeholder?: string;
  isOpen?: boolean;
  options?: string[];
  disabledOptions?: string[];
  size?: "L" | "M";
  disabled?: boolean;
  onClick?: () => void;
  onSelectOption?: (option: string) => void;
}

export default function DropBox({
  value,
  placeholder = "Option",
  isOpen = false,
  options = [],
  disabledOptions = [],
  size = "L",
  disabled = false,
  onClick,
  onSelectOption,
}: DropBoxProps) {
  return (
    <S.Container $size={size}>
      <S.DropBoxField $size={size} $disabled={disabled} onClick={disabled ? undefined : onClick}>
        <S.OptionText $size={size}>{value || placeholder}</S.OptionText>
        <S.ArrowIcon $isOpen={isOpen}>
          <img
            src={isOpen ? "/arrow_up.svg" : "/arrow_down.svg"}
            alt={isOpen ? "Arrow up" : "Arrow down"}
          />
        </S.ArrowIcon>
      </S.DropBoxField>
      {isOpen && options.length > 0 && size === "L" && (
        <S.DropdownList>
          {options.map((option, index) => {
            const isActive = disabledOptions.includes(option);
            const isSelected = value === option;
            return (
              <S.DropOption
                key={index}
                $isActive={isActive}
                $isSelected={isSelected}
                data-disabled={isActive ? "true" : "false"}
                onClick={() => !isActive && onSelectOption?.(option)}
              >
                <S.OptionLabel $isActive={isActive}>{option}</S.OptionLabel>
              </S.DropOption>
            );
          })}
        </S.DropdownList>
      )}
    </S.Container>
  );
}

