import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchInquiry } from "../../api";
import Pagenation from "../../components/Pagenation";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100rem;
  height: 92rem;
  min-width: 100rem;
  margin-bottom: 22rem;
`;
const InquiryTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 6.5rem;
`;
const InquiryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100rem;
  height: 92rem;
  padding: 5rem;
  min-width: 100rem;
  border: 1px solid black;
`;
const InquiryText = styled.div`
  display: flex;
  width: 80rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
`;
const InquiryName = styled.span`
  width: 80%;
`;
const InquiryEmail = styled.span`
  width: 20%;
`;
const InquiryWrite = styled.div`
  width: 78rem;
  text-align: right;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

//한번에 불러올 페이지 사이즈
const pageSize = 10;

function Inquiry() {
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
              <InquiryText>
                <Link to={`/inquiry/${inquiry.inquiryId}`}>
                  <InquiryName>{inquiry.inquiryTitle}</InquiryName>
                </Link>
                <InquiryEmail>
                  <h1>{inquiry.userEmail}</h1>
                </InquiryEmail>
              </InquiryText>
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
        <Container>
          <InquiryTitle>Q & A</InquiryTitle>
          <InquiryList>
            <Body></Body>
            <InquiryWrite>
              <Link to={`/inquiry/create`}>문의 작성</Link>
            </InquiryWrite>
            <Pagenation
              total={inquiryState.totalPages}
              onChange={async (page) => fetch(page - 1)}
              hideNav={true}
            ></Pagenation>
          </InquiryList>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Inquiry;
