import * as S from './Keyword.styles';

type KeywordProps = {
  items: string[];
  color?: 'green' | 'purple';
  size?: 's' | 'm';
};

export const Keyword = ({ items, color = 'green', size = 'm' }: KeywordProps) => {
  const isSingle = items.length === 1;

  return (
    <S.Container color={color} isSingle={isSingle} size={size}>
      {items.map((item, i) => (
        <S.Text key={i} divide={!isSingle && i === 0} size={size}>
          {item}
        </S.Text>
      ))}
    </S.Container>
  );
};
