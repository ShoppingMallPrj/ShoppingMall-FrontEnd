import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  fetchUserEmailLogin,
  fetchUserGoogleLogin,
  fetchUserKakaoLogin,
} from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import styled from "styled-components";
import KakaoLoginImg from "../assets/logo/kakao_login_medium_narrow.png";
import KaKaoOauth from "react-kakao-login";
import { GoogleLogin as GoogleOauth } from "react-google-login";

const CLIENT_ID_KAKAO = process.env.REACT_APP_CLIENT_ID_KAKAO;
const CLIENT_ID_GOOGLE = process.env.REACT_APP_CLIENT_ID_GOOGLE;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 47.6rem;
  margin-bottom: 82.8rem;
  min-width: 144rem;
`;
const LoginTitle = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 6.5rem;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 12.5rem;
  margin-bottom: 2rem;
`;
const LoginInput = styled.input`
  border: 1px solid black;
  padding-left: 0.5rem;
  height: 2.5rem;
  margin-bottom: 2.6rem;
  &::placeholder {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
    color: black;
  }
  &:focus {
    border: 1px solid black;
    outline: none;
  }
`;
const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
`;
const LoginTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;
const SocialLogins = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const KakaoLink = styled(KaKaoOauth)`
  width: 14rem !important;
  height: 3rem !important;
`;
const KakaoLogin = styled.img`
  width: 14rem;
  height: 3rem;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
`;
const GoogleLink = styled(GoogleOauth)`
  width: 15rem;
  height: 3rem;
  margin-left: 1.5rem;

  span {
    font-size: 0.5rem;
    margin-left: 0.5rem;
  }
  div {
    display: flex;
    align-items: center;
    height: 3rem;
    margin-right: 0px !important;
    margin-left: 0.5rem;
  }
`;

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);
  const { mutate } = useMutation(fetchUserEmailLogin, {
    onSuccess: (data) => onLogin(data),
  });
  const onSubmit = (data, event) => {
    event.preventDefault();
    mutate(data);
  };
  const onLogin = async (data) => {
    const json = await data.json();
    if (data.ok) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          user: true,
          token: json.token,
        })
      );
      setLogin(() => {
        return { user: true, userRole: json.userRole, token: json.token };
      });
      navigate("/");
    }
  };
  const onSuccessKakaoLogin = async (response) => {
    const tokenId = response.response.access_token;
    const data = await fetchUserKakaoLogin(tokenId);
    onLogin(data);
  };
  const onSuccessGooglLogin = async (response) => {
    const tokenId = response.tokenId;
    const data = await fetchUserGoogleLogin(tokenId);
    onLogin(data);
  };
  return (
    <>
      <Header />
      <main>
        <Container>
          <LoginTitle>Login</LoginTitle>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <LoginInput
              {...register("email")}
              type="text"
              required
              placeholder="Email"
            />
            <LoginInput
              {...register("password")}
              type="password"
              required
              placeholder="password"
            />
            <LoginButton>Login</LoginButton>
          </LoginForm>
          <SocialLogins>
            <KakaoLink
              token={CLIENT_ID_KAKAO}
              onSuccess={onSuccessKakaoLogin}
              onFail={console.error}
              onLogout={console.info}
            >
              <KakaoLogin src={KakaoLoginImg} />
            </KakaoLink>
            <GoogleLink
              clientId={CLIENT_ID_GOOGLE}
              buttonText="Login With Google"
              onSuccess={onSuccessGooglLogin}
              onFailure={console.error}
              cookiePolicy={"single_host_origin"}
            />
          </SocialLogins>
          <LoginTexts>
            <LoginText>Forgot your password?</LoginText>
            <LoginText>
              <Link to={"/join"}>Register a new account</Link>
            </LoginText>
          </LoginTexts>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Login;
