import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { fetchInquiryDetail, answerInquiry } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function InquiryDetail() {
  const { register, handleSubmit } = useForm();

  const { inquiryId } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [inquiryState, setInquiryState] = useState({
    inquiry: {},
    isLoading: true,
    isError: false,
  });

  const fetch = async () => {
    try {
      const res = await fetchInquiryDetail(inquiryId);
      setInquiryState({
        ...inquiryState,
        inquiry: res,
        isLoading: false,
      });
    } catch (error) {
      setInquiryState({ ...inquiryState, isLoading: false });
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      const res = await answerInquiry(user.token, inquiryId, data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const InquiryContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100rem;
    height: 92rem;
    min-width: 100rem;
    border: 1px solid black;
    font-size: 1.4rem;
    margin-bottom: 22rem;
  `;
  const InquiryTitle = styled.span`
    font-size: 1.8rem;
    width: 100%;
    height: 5%;
    border-bottom: 1px solid black;
    padding: 1rem;
  `;
  const InquiryContent = styled.span`
    width: 100%;
    height: 45%;
    border-bottom: 1px solid black;
    padding: 1rem;
  `;
  const InquiryTime = styled.span`
    width: 100%;
    height: 5%;
    border-bottom: 1px solid black;
    padding: 1rem;
  `;
  const InquiryAnswer = styled.span`
    width: 100%;
    height: 45%;
    padding: 1rem;
  `;

  const Body = () => {
    if (inquiryState.isLoading) return <>LOADING...</>;
    if (inquiryState.isError) return <>Error</>;

    return (
      <>
        <InquiryContents>
          <InquiryTitle>{inquiryState.inquiry.inquiryTitle}</InquiryTitle>
          <InquiryTime>{inquiryState.inquiry.inquiryTime}</InquiryTime>
          <InquiryContent>{inquiryState.inquiry.inquiryContent}</InquiryContent>
          <InquiryAnswer>{inquiryState.inquiry.inquiryAnswer}</InquiryAnswer>
        </InquiryContents>

        {/* {user.userRole === "ADMIN" && (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("answer")} />
              <button type="submit">전송</button>
            </form>
          </>
        )} */}
      </>
    );
  };

  return (
    <>
      <Header />
      <main>
        <Body></Body>
      </main>
      <Footer />
    </>
  );
}

export default InquiryDetail;
