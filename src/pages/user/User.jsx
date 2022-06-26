import styled from "styled-components";
import { useState, useEffect } from "react";
import { fetchUser } from "../../api";

// import Components
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function User() {

  const [userState, setUserState] = useState({
    user: {},
    isLoading: false,
    isError: false,
  });
  
  const fetch = async () => {

    const user = sessionStorage.getItem('user');
    const res = await fetchUser(JSON.parse(user).token);
    console.log(await res.json());
  }

  useEffect(() => {
    fetch();
  }, []);
  
  return (
    <>
      <Header/>
      <main> 
      </main>
      <Footer/>
    </>
  )

}

export default User;