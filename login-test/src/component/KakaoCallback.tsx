import { useEffect } from "react";
import axios from "axios";
import { CLIENT_ID, REDIRECT_URI } from "../constant/OAuth";

interface resInfo {
  data: {
    kakao_account: {
      profile: object;
    };
    access_token: object;
  };
}

function KakaoCallback() {
  // code: 카카오로부터 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const grantType = "authorization_code";

  useEffect(() => {
    if (code) {
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
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                },
              }
            )
            .then((res: resInfo) => {
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
