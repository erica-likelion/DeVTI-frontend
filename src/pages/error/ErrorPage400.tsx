import { useNavigate } from "react-router-dom";
import * as S from "./ErrorPage.styles";
import BkLTextButton from "@/components/ButtonStatic/BkLTextButton";
import { useAuthStore } from "@/stores/authStore";

export default function ErrorPage400() {
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
      <S.Title>Client Error</S.Title>
      <S.Subtitle>죄송합니다, 클라이언트의 요청에 오류가 발생했습니다.</S.Subtitle>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.ErrorImage src="/dog_error.webp" alt="400 Error" />
      </S.ImageWrapper>
      <S.ButtonWrapper>
        <BkLTextButton onClick={handleGoHome}>
          홈으로 돌아가기
        </BkLTextButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}