import { KAKAO_AUTH_URL } from "../constant/OAuth";
import loginLogo from "../assets/loginLogo.png";

function KakaoLogin() {
  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <img src={loginLogo} />
      </a>
    </div>
  );
}

export default KakaoLogin;
