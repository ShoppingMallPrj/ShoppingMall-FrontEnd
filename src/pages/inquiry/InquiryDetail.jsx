import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { fetchInquiryDetail, answerInquiry } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InquiryDetail() {

  const {
    register,
    handleSubmit,
  } = useForm();  
  
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

  const Body = () => {
    
    if (inquiryState.isLoading) return <>LOADING...</>;
    if (inquiryState.isError) return <>Error</>;

    return (
      <>
        <div>{inquiryState.inquiry.inquiryTitle}</div>
        <div>{inquiryState.inquiry.inquiryContent}</div>
        <div>{inquiryState.inquiry.inquiryTime}</div>
        <div>{inquiryState.inquiry.inquiryAnswer}</div>

        {user.userRole === "ADMIN" && (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("answer")} />
              <button type="submit">전송</button>
            </form>
          </>
        )}
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
