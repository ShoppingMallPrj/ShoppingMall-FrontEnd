import { fetchUserUpdate } from "../../api";
import { useForm } from "react-hook-form";

function UserUpdate({user}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data, event) => {

    event.preventDefault();
    try {
      const token = JSON.parse(sessionStorage.getItem("user")).token;
      const res = await fetchUserUpdate(token, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        phone
        <input
          defaultValue={user.userPhone}
          {...register("userPhone", {
            defaultValue: `${user.userPhone}`,
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: "Phone Number is not valid",
            },
          })}
        />
        addr1
        <input
          defaultValue={user.userAddr1}
          {...register("userAddr1", {
            defaultValue: `${user.userAddr1}`,
          })}
        />
        addr2
        <input
          defaultValue={user.userAddr2}
          {...register("userAddr2", {
            defaultValue: `${user.userAddr2}`,
          })}
        />
        addr3
        <input
          defaultValue={user.userAddr3}
          {...register("userAddr3", {
            defaultValue: `${user.userAddr3}`,
          })}
        />
        <button type="submit">유저정보 변경</button>
      </form>
    </>
  );
}

export default UserUpdate;
