import * as S from './HomePageDefault.styles';
import InputField from '@/components/Input/InputField';

// Dynamic Buttons
import WtMButton from '@/components/ButtonDynamic/WtMButton';
import WarningButton from '@/components/ButtonDynamic/WarningButton';
import VT700LButton from '@/components/ButtonDynamic/VT700LButton';
import VT500SButton from '@/components/ButtonDynamic/VT500SButton';
import ArrowLeftTextButton from '@/components/ButtonDynamic/ArrowLeftTextButton';
import ArrowRightTextButton from '@/components/ButtonDynamic/ArrowRightTextButton';
import CheckboxButton from '@/components/ButtonDynamic/CheckboxButton';
import ClearMImgTextButton from '@/components/ButtonDynamic/ClearMImgTextButton';
import ClearMTextButton from '@/components/ButtonDynamic/ClearMTextButton';
import WtLCloseButton from '@/components/ButtonDynamic/WtLCloseButton';
import WtLPawButton from '@/components/ButtonDynamic/WtLPawButton';

// Static Buttons
import BkMTextButton from '@/components/ButtonStatic/BkMTextButton';
import WtMTextButton from '@/components/ButtonStatic/WtMTextButton';
import NumButton from '@/components/ButtonStatic/NumButton';
import BkLTextButton from '@/components/ButtonStatic/BkLTextButton';
import PawprintButton from '@/components/ButtonStatic/PawprintButton';
import WtMIconButton from '@/components/ButtonStatic/WtMIconButton';
import CopyIconButton from '@/components/ButtonStatic/CopyIconButton';

export default function HomePage() {
  return (
    <S.Container>
      <S.Title>Button & Component Test Page</S.Title>
      <S.ListWrapper>
        
        <S.ButtonSection>
          <h2>Dynamic Buttons</h2>
          <S.ButtonGrid>
            <ArrowLeftTextButton>이전</ArrowLeftTextButton>
            <ArrowRightTextButton>다음</ArrowRightTextButton>
            <CheckboxButton>체크박스</CheckboxButton>
            <ClearMImgTextButton>이미지텍스트</ClearMImgTextButton>
            <ClearMTextButton>클리어텍스트</ClearMTextButton>
            <VT500SButton>VT500S</VT500SButton>
            <VT700LButton>VT700L</VT700LButton>
            <WarningButton>경고</WarningButton>
            <WtLCloseButton />
            <WtLPawButton />
            <WtMButton>WtM버튼</WtMButton>
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>Static Buttons</h2>
          <S.ButtonGrid>
            <BkLTextButton>BkL텍스트</BkLTextButton>
            <BkMTextButton>BkM텍스트</BkMTextButton>
            <CopyIconButton />
            <NumButton>1</NumButton>
            <NumButton disabled>2</NumButton>
            <NumButton isSelected>3</NumButton>
            <PawprintButton />
            <WtMIconButton />
            <WtMTextButton>WtM텍스트</WtMTextButton>
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>Button States Test</h2>
          <S.ButtonGrid>
            <WtMTextButton>기본</WtMTextButton>
            <WtMTextButton disabled>비활성</WtMTextButton>
            <VT700LButton>호버해보세요</VT700LButton>
            <WarningButton>Btn</WarningButton>
            <CheckboxButton>비활성 체크박스</CheckboxButton>
            <NumButton>4</NumButton>
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>Icon Only Buttons</h2>
          <S.ButtonGrid>
            <WtLCloseButton />
            <WtLPawButton />
            <CopyIconButton />
            <PawprintButton />
            <WtMIconButton />
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>Text Buttons</h2>
          <S.ButtonGrid>
            <BkLTextButton>큰 검은 버튼</BkLTextButton>
            <BkMTextButton>중간 검은 버튼</BkMTextButton>
            <WtMTextButton>흰색 중간 버튼</WtMTextButton>
            <ClearMTextButton>클리어 텍스트</ClearMTextButton>
            <ClearMImgTextButton>클리어 이미지텍스트</ClearMImgTextButton>
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>Arrow & Navigation Buttons</h2>
          <S.ButtonGrid>
            <ArrowLeftTextButton>이전 페이지</ArrowLeftTextButton>
            <ArrowRightTextButton>다음 페이지</ArrowRightTextButton>
            <ArrowLeftTextButton disabled>이전 (비활성)</ArrowLeftTextButton>
            <ArrowRightTextButton disabled>다음 (비활성)</ArrowRightTextButton>
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>Number Buttons</h2>
          <S.ButtonGrid>
            <NumButton>1</NumButton>
            <NumButton>2</NumButton>
            <NumButton isSelected>3</NumButton>
            <NumButton disabled>4</NumButton>
            <NumButton>5</NumButton>
            <NumButton>6</NumButton>
          </S.ButtonGrid>
        </S.ButtonSection>

        <S.ButtonSection>
          <h2>VT Series Buttons</h2>
          <S.ButtonGrid>
            <VT500SButton>VT500 Small</VT500SButton>
            <VT500SButton disabled>VT500 비활성</VT500SButton>
            <VT700LButton>VT700 Large</VT700LButton>
            <VT700LButton disabled>VT700 비활성</VT700LButton>
          </S.ButtonGrid>
        </S.ButtonSection>
        
        <S.InputTestSection>
          <h2>InputField 테스트</h2>
          <S.InputGrid>
            <InputField 
              placeholder="기본 Input Field" 
              value=""
              onChange={() => {}}
              hasIcon={false}
            />
            
            <InputField 
              placeholder="아이콘이 있는 Input Field" 
              value=""
              onChange={() => {}}
              hasIcon={true}
            />
            
            <InputField 
              value="출력 전용 필드 (variant=output)"
              variant="output"
            />
            
            <InputField 
              value="아이콘 + 출력 모드"
              hasIcon={true}
              variant="output"
            />
          </S.InputGrid>
        </S.InputTestSection>
        
      </S.ListWrapper>
    </S.Container>
  );
}