import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

function InquiryCreate() {
  /* 최초 로딩 (페이지는 0부터 시작함) */

  return (
    <>
      <Header />
      <main>
        {/*title*/}
        <div>제목</div>
        <input></input>
        {/*title*/}
        <div>내용</div>
        <input></input>

      </main>
      <Footer />
    </>
  );
}

export default InquiryCreate;
