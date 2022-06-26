import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchInquiryDetail } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InquiryDetail() {
  const { inquiryId } = useParams();
  const [inquiryState, setInquiryState] = useState({
    inquiry: {},
    isLoading: true,
    isError: false,
  });

  const fetch = async () => {
    try {
      const res = await fetchInquiryDetail(inquiryId);

      console.log(res);
      setInquiryState({
        ...inquiryState,
        inquiry: res,
        isLoading: false,
      });
    } catch (error) {
      setInquiryState({ ...inquiryState, isLoading: false });
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
