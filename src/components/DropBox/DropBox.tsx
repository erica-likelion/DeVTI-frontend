import * as S from "./DropBox.styles";

interface DropBoxProps {
  value?: string;
  placeholder?: string;
  isOpen?: boolean;
  options?: string[];
  disabledOptions?: string[];
  size?: "L" | "M";
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
  onClick,
  onSelectOption,
}: DropBoxProps) {
  return (
    <S.Container $size={size}>
      <S.DropBoxField $size={size} onClick={onClick}>
        <S.OptionText $size={size}>{value || placeholder}</S.OptionText>
        <S.ArrowIcon $isOpen={isOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.42993 8.51193C4.49406 8.43711 4.5723 8.37566 4.66019 8.33109C4.74808 8.28652 4.84389 8.25971 4.94215 8.25219C5.0404 8.24467 5.13918 8.25658 5.23283 8.28725C5.32647 8.31792 5.41316 8.36675 5.48793 8.43093L11.9999 14.0119L18.5119 8.43093C18.6638 8.30906 18.857 8.25101 19.0509 8.26904C19.2447 8.28707 19.424 8.37977 19.5507 8.52756C19.6775 8.67534 19.7418 8.86662 19.7301 9.06095C19.7183 9.25529 19.6315 9.43745 19.4879 9.56894L12.4879 15.5689C12.352 15.6854 12.1789 15.7494 11.9999 15.7494C11.8209 15.7494 11.6479 15.6854 11.5119 15.5689L4.51193 9.56894C4.36112 9.43945 4.26787 9.25539 4.25268 9.0572C4.23749 8.859 4.30161 8.66289 4.43093 8.51193"
              fill="#19181D"
            />
          </svg>
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

