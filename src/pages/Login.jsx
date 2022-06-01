import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { fetchUserEmailLogin } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate } = useMutation(fetchUserEmailLogin, {
    onSuccess: async (data) => {
      const json = await data.json();
      console.log(json);
      navigate("/");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="text"
            required
            placeholder="Email"
          />
          <input
            {...register("password")}
            type="password"
            required
            placeholder="password"
          />
          <button>Login</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
