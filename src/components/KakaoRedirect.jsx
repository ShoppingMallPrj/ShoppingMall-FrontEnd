import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchUserKakaoLogin } from "../api";

function KakaoRedirect() {
  const { data, isLoading } = useQuery("kakaoLogin", () =>
    fetchUserKakaoLogin(code)
  );
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  if (data.ok) {
    navigate("/");
  }

  return <h1>{isLoading ? "Loading..." : ""}</h1>;
}

export default KakaoRedirect;
