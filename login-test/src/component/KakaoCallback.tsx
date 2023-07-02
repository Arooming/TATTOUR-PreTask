import { useEffect } from "react";
import axios from "axios";
import { CLIENT_ID, REDIRECT_URI } from "../constant/OAuth";

interface resInfo {
  data: {
    kakao_account: {
      profile: object;
    };
    access_token: string;
  };
}

function KakaoCallback() {
  // code: 카카오로부터 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const grantType = "authorization_code";

  useEffect(() => {
    if (code) {
      // 토큰을 받기 위한 코드 (access_token(6시간), refresh_token(2달) 받아올 수 있음)
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {},
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res: resInfo) => {
          console.log(res);
          const { access_token } = res.data;
          // 유저 개인정보 받아오기 위한 호출 코드
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              // post body (post 통신 시, 데이터가 없다면 빈 객체로 보냄)
              {},
              // request headers
              {
                headers: {
                  // Authorization: 사용자 인증 수단, 엑세스 토큰 값
                  Authorization: `Bearer ${access_token}`,
                  "Content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                },
              }
            )
            .then((res: resInfo) => {
              // 유저 id도 발급해줌
              console.log(res);
              // 유저 닉네임 가져오기
              console.log(res.data.kakao_account.profile);
            });
        })
        .catch((Error: object) => {
          console.log(Error);
        });
    }
  }, [code]);
  return <div></div>;
}

export default KakaoCallback;
