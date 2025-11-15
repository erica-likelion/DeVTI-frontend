import React, { useState, useRef, useEffect } from 'react';
import * as S from './RoleTabs.styles';

export const RoleTabs = ({ tabs }: { tabs: string[] }) => {
  const [active, setActive] = useState(tabs[0]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = tabs.indexOf(active);
    const element = tabRefs.current[index];

    if (element) {
      const { offsetLeft, offsetWidth } = element;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [active, tabs]);

  return (
    <S.Container>
      {tabs.map((tab, i) => (
        <S.TabButton
          key={tab}
          ref={(el: HTMLButtonElement | null) => {tabRefs.current[i] = el;}}
          isActive={tab === active}
          onClick={() => setActive(tab)}
        >
          {tab}
        </S.TabButton>
      ))}
      
      <S.Indicator style={indicatorStyle} />
    </S.Container>
  );
};


export default RoleTabs;