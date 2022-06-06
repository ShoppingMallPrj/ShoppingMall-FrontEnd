import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { fetchUserEmailJoin } from "../api";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 82.8rem;
  min-width: 144rem;
`;
const JoinTitle = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 6.5rem;
`;
const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30rem;
  height: 31rem;
  margin-bottom: 2rem;
`;
const JoinInput = styled.input`
  border: 1px solid black;
  padding-left: 0.5rem;
  height: 2.5rem;
  color: ${(props) => (props.errors ? "red" : "black")};
  border: ${(props) => (props.errors ? "1px solid red" : "1px solid black")};
  &::placeholder {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${(props) => (props.errors ? "red" : "black")};
  }
  &:focus {
    border: ${(props) => (props.errors ? "1px solid red" : "1px solid black")};
    outline: none;
    /* background-color: transparent; */
  }
`;
const JoinButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
`;
const JoinTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const JoinText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;
const JoinError = styled.span``;

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { isLoading, mutate } = useMutation(fetchUserEmailJoin, {
    onSuccess: async (data) => {
      const result = await data.json();
      if (data.ok) {
        return navigate("/login");
      } else {
        throw new Error(result.messages);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data, event) => {
    if (data.userPw !== data.confirmPassword) {
      setError("userPw", {
        message: "Password does not match Confirm Password.",
      });
      setError("confirmPassword");
    }
    event.preventDefault();
    delete data.confirmPassword;
    mutate(data);
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <JoinTitle>Join</JoinTitle>
          <JoinForm onSubmit={handleSubmit(onSubmit)}>
            <JoinInput
              errors={errors.userEmail}
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z0-9._%+-]+$/,
                  message: "Email is not valid",
                },
              })}
              type="text"
              placeholder="email"
            />
            <JoinError>{errors?.userEmail?.message}</JoinError>
            <JoinInput
              errors={errors.userPw}
              {...register("userPw", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 digits",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
                  message:
                    "Password must include at least one letter, number, special symbol",
                },
              })}
              type="password"
              placeholder="password"
            />
            <JoinError>{errors?.userPw?.message}</JoinError>
            <JoinInput
              errors={errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              type="password"
              placeholder="confirm passowrd"
            />
            <JoinError>{errors?.confirmPassword?.message}</JoinError>
            <JoinInput
              errors={errors.userName}
              {...register("userName", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 digits",
                },
              })}
              type="text"
              placeholder="name"
            />
            <JoinError>{errors?.userName?.message}</JoinError>
            <JoinInput
              errors={errors.userPhone}
              {...register("userPhone", {
                required: "Phone Number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Phone Number is not valid",
                },
              })}
              type="text"
              placeholder="phone number"
            />
            <JoinError>{errors?.userPhone?.message}</JoinError>
            <JoinInput
              errors={errors.code}
              {...register("code", {
                required: "Code is required",
              })}
              type="text"
              placeholder="code"
            />
            <JoinError>{errors?.code?.message}</JoinError>
            <JoinButton>Join</JoinButton>
          </JoinForm>
          <JoinTexts>
            {isLoading ? <JoinText>Joining...</JoinText> : ""}
            <JoinText>Already have an account?</JoinText>
            <JoinText>
              <Link to={"/login"}>Log In</Link>
            </JoinText>
          </JoinTexts>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Join;
