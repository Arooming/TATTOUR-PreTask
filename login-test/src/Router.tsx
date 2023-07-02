import { BrowserRouter, Routes, Route } from "react-router-dom";
import KakaoLogin from "./component/KakaoLogin";
import KakaoCallback from "./component/KakaoCallback";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KakaoLogin />} />
        <Route path="/login/oauth2/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
