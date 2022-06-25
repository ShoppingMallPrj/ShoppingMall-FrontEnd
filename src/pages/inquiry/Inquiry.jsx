import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchInquiry, fetchInquiryDetail } from "../../api";
import Pagenation from "../../components/Pagenation";
import styled from "styled-components";

//한번에 불러올 페이지 사이즈
const pageSize = 10;

function Inquiry() {

  const navigate = useNavigate();

  const [inquiryState, setInquiryState] = useState({
    content: [],
    totalPages: 0, // 전체 페이지
    isLast: false, //마지막?
    isLoading: false, //로딩중 여부
    isError: false, //에러 여부
  });

  //page fetch하는 function
  const fetch = async (page) => {
    try {
      //로딩 시작
      setInquiryState((inquiryState) => ({ ...inquiryState, isLoading: true }));
      const res = await fetchInquiry({ page: page, size: pageSize });
      setInquiryState((inquiryState) => ({
        content: res.content,
        totalPages: res.totalPages,
        isLoading: false,
      }));
      console.log(res);
      //setInquiryState(res.data);
    } catch (error) {
      setInquiryState((inquiryState) => ({ ...inquiryState, isError: true }));
    }
  };

  /* 최초 로딩 (페이지는 0부터 시작함) */
  useEffect(() => {
    fetch(0);
  }, []);

  const Body = () => {
    if (inquiryState.isLoading) return <>LOADING...</>;
    if (inquiryState.isError) return <>Error</>;
    return (
      <>
        {inquiryState.content.map((inquiry) => {
          return (
            <>
              <Link to={`/inquiry/${inquiry.inquiryId}`}>
                {inquiry.inquiryTitle}
              </Link>
              <h1>{inquiry.userEmail}</h1>
            </>
          );
        })}

      </>
    );
  };  

  return (
    <>
      <Header />
      <main>
        <Body></Body>
        {/* 글 작성 링크 */}
        <Link to={`/inquiry/create`}>문의 작성</Link>
        {/* 페이지네이션 */}
        <Pagenation
          total={inquiryState.totalPages}
          onChange={async (page) => fetch(page - 1)}
          //fetch={(page) => fetch(page)}
          hideNav={true}
        ></Pagenation>
      </main>

      <Footer />
    </>
  );
}

export default Inquiry;
