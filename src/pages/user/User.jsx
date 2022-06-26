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

    try {
    
    } catch {

    }
    
    const user = sessionStorage.getItem('user');
    const res = await fetchUser(JSON.parse(user).token);
    
    console.log(await res.json());
  }

  useEffect(() => {
    fetch();
  }, []);

  const Body = () => {

    if (userState.isLoading) return <>LOADING...</>;
    if (userState.isError) return <>Error</>;

    return (
      <>
      </>
    )

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