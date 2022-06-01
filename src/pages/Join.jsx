import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { fetchUserEmailJoin } from "../api";
import { useNavigate } from "react-router-dom";

function Join() {
  const { register, handleSubmit } = useForm();
  const { isLoading, data, isSuccess, mutate, error } = useMutation(
    fetchUserEmailJoin,
    {
      onSuccess: async (data) => {
        const result = await data.json();
        if (data.ok) {
          return console.log(result);
        } else {
          throw new Error(result.messages);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const navigate = useNavigate();

  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    mutate(data, {
      onSuccess: (data) => {
        if (data.status === 200) {
          navigate("/login");
        } else {
          console.log("Error Error Error");
        }
      },
    });
  };

  return (
    <>
      <Header />
      <main>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("userEmail")}
            required
            type="email"
            placeholder="Email"
          />
          <input
            {...register("code")}
            required
            type="text"
            placeholder="code"
          />
          <input
            {...register("userPw")}
            required
            type="password"
            placeholder="PASSWORD"
          />
          {/* <input
            {...register("confirmPassword")}
            required
            type="password"
            placeholder="CONFIRM PASSWORD"
          /> */}
          <input
            {...register("userName")}
            required
            type="text"
            placeholder="NAME"
          />
          <input
            {...register("userPhone")}
            required
            type="text"
            placeholder="PHONE NUMBER"
          />
          <input
            {...register("user_addr1")}
            required
            type="text"
            placeholder="USER ADDRESS1"
          />
          <input
            {...register("user_addr2")}
            required
            type="text"
            placeholder="USER ADDRESS2"
          />
          <input
            {...register("user_addr3")}
            required
            type="text"
            placeholder="USER ADDRESS3"
          />
          <button>Join</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Join;
