import { type ReactNode } from 'react';
import * as S from './List.styles';
import WtMTextButton from '../../ButtonStatic/WtMTextButton';

interface ListItem {
  id: string | number;
  content: ReactNode | string[];
  buttonText: string;
  onClick: () => void;
}

interface ListProps {
  items: ListItem[];
}

export default function List({ items }: ListProps) {
  return (
    <S.Container>
      {items.map((item) => (
        <S.ListItem key={item.id}>
          {Array.isArray(item.content) ? (
            <S.ContentWrapper>
              {item.content.map((line, index) => (
                <S.ContentLine key={index}>{line}</S.ContentLine>
              ))}
            </S.ContentWrapper>
          ) : (
            <S.ItemContent>{item.content}</S.ItemContent>
          )}
          <WtMTextButton onClick={item.onClick}>
            {item.buttonText}
          </WtMTextButton>
        </S.ListItem>
      ))}
    </S.Container>
  );
}