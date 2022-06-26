import styled from "styled-components";
import { loginState } from "../../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { fetchUser } from "../../api";

// import Components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UserUpdate from "./UserUpdate";

function User() {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [userState, setUserState] = useState({
    user: {},
    isLoading: true,
    isError: false,
  });
  
  const fetch = async () => {

    try {
      const user = sessionStorage.getItem("user");
      const res = await fetchUser(JSON.parse(user).token);
      const data =await res.json()
      setUserState((userState)=>({user: data, isLoading: false}))
    
    } catch {
      setUserState((userState) => ({ ...useState, isError: false }));
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  const MyModal = () => {
    
    return (
      <Modal
        isOpen={modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={modalStyle}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <UserUpdate user={userState.user} />
      </Modal>
    );

  }

  const Body = () => {

    if (userState.isLoading) return <>LOADING...</>;
    if (userState.isError) return <>Error</>;

    return (
      <>
        {userState.user.userEmail}
        {userState.user.userPhone}
        {userState.user.user_addr1}
        {userState.user.user_addr2}
        {userState.user.user_addr3}
        {userState.user.regiDate}
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          유저 수정
        </button>
        <MyModal></MyModal>
      </>
    );

  }
  
  return (
    <>
      <Header/>
      <main> 
        <Body>
        </Body>
      </main>
      <Footer/>
    </>
  )

}

export default User;

/* 모달 스타일 */
const modalStyle = {
  /* 바깥 부분 */
  overlay: {
    position: 'fixed',
    zIndex: 1020,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* 모달 내부 */
  content: {
    background: 'white',
    width: '45rem',
    maxWidth: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 2rem)',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid blue',
    borderRadius: '0.3rem',
  }
}