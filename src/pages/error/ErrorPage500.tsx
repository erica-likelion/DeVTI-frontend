import { useNavigate } from "react-router-dom";
import * as S from "./ErrorPage.styles";
import BkLTextButton from "@/components/ButtonStatic/BkLTextButton";
import { useAuthStore } from "@/stores/authStore";

export default function ErrorPage500() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const handleGoHome = () => {
    // 로그인 상태에 따라 다른 페이지로 이동
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/landing");
    }
  };

  return (
    <S.Container>
      <S.TextWrapper>
        <S.Title>Server Error</S.Title>
        <S.Subtitle>죄송합니다, 서버에 오류가 발생했습니다.</S.Subtitle>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.ErrorImage src="/golden.webp" alt="500 Error" />
      </S.ImageWrapper>
      <S.ButtonWrapper>
        <BkLTextButton onClick={handleGoHome}>
          홈으로 돌아가기
        </BkLTextButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}