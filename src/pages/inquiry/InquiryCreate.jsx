import { createInquiry } from "../../api";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const InquiryForm = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 100rem;
    height: 92rem;
    min-width: 100rem;
    /* border: 1px solid black; */
    font-size: 1.4rem;
    margin-bottom: 22rem;
  `;
  const InquiryTitle = styled.span`
    font-size: 1.8rem;
    padding: 1rem;
  `;
  const InquiryContent = styled.span`
    font-size: 1.8rem;
    padding: 1rem;
  `;
  const InquiryInput = styled.input`
    font-size: 1.4rem;
  `;
  const InquiryTextarea = styled.textarea`
    font-size: 1.4rem;
    height: 20rem;
    margin-bottom: 5rem;
  `;
  const InquiryButton = styled.button`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
    font-size: 1.6rem;
    cursor: pointer;
    &:last-child() {
      font-weight: 600;
    }
  `;

  return (
    <>
      <Header />
      <main>
        <InquiryForm onSubmit={handleSubmit(onSubmit)}>
          <InquiryTitle>제목</InquiryTitle>
          <InquiryInput {...register("inquiryTitle")} />
          <InquiryContent>내용</InquiryContent>
          <InquiryTextarea {...register("inquiryContent")} />
          <InquiryButton type="submit">Write</InquiryButton>
        </InquiryForm>
      </main>
      <Footer />
    </>
  );
}

export default InquiryCreate;
