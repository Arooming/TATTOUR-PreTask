import { useEffect } from "react";

function KakaoCallback() {
  // code: 카카오로부터 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      console.log(code);
    }
  }, [code]);
  return <div></div>;
}

export default KakaoCallback;
