import { createInquiry } from "../../api";
import { useForm } from "react-hook-form";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

function InquiryCreate() {

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
      const res = await createInquiry(token, data);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <>
      <Header />
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>제목</div>
          <input {...register("inquiryTitle")} />
          <div>내용</div>
          <input {...register("inquiryContent")} />
          <button type="submit">전송</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default InquiryCreate;
