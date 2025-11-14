import { type ReactNode } from 'react';
import * as S from './List.styles';
import { WhiteMButton } from '../../Button';

interface ListItem {
  id: string | number;
  content: ReactNode;
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
          {item.content}
          <WhiteMButton onClick={item.onClick}>
            {item.buttonText}
          </WhiteMButton>
        </S.ListItem>
      ))}
    </S.Container>
  );
}