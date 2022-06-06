import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { fetchUserEmailLogin } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 82.8rem;
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
  height: 31rem;
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

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);
  const { mutate } = useMutation(fetchUserEmailLogin, {
    onSuccess: async (data) => {
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
          return { user: true, token: json.token };
        });
        navigate("/");
      }
    },
  });
  const onSubmit = (data, event) => {
    event.preventDefault();
    mutate(data);
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
