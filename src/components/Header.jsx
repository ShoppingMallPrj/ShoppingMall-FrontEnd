import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../atoms";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin: 2.8rem 6.2rem;
  font-weight: 600;
  max-width: 131.6rem;
  min-width: 131.6rem;
`;
const Title = styled.span`
  font-size: 3rem;
`;
const Nav = styled.div``;
const NavList = styled.span`
  font-size: 1.3rem;
  text-transform: uppercase;
  margin-left: 2.4rem;
  &:hover {
    cursor: pointer;
  }
`;

function Header() {
  const [sidebar, setSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState);
  const session = JSON.parse(sessionStorage.getItem("user"));
  const switchSidebar = () => {
    setSidebar(!sidebar);
  };
  const hideSidebar = () => {
    setSidebar(false);
  };
  const switchSearchbar = () => {
    setSearchbar(!searchbar);
  };
  const hideSearchbar = () => {
    setSearchbar(false);
  };
  const logoutUser = () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        user: false,
        token: null,
      })
    );
    setLogin(() => {
      return { user: false, userRole: null, token: null };
    });
    navigate("/");
  };
  return (
    <>
      <header>
        {session?.user ? (
          <Container>
            <Title>
              <Link to={"/"}>OUR CLOTHING</Link>
            </Title>
            <Searchbar searchbar={searchbar} hideSearchbar={hideSearchbar} />
            <Nav>
              <NavList onClick={switchSearchbar}>Search</NavList>
              <NavList onClick={logoutUser}>Logout</NavList>
              <NavList>
                {login.userRole === "ADMIN" ? (
                  <Link to={"/admin/item"}>Mypage</Link>
                ) : (
                  <Link to={"/mypage"}>Mypage</Link>
                )}
              </NavList>
              <NavList>
                {login.userRole === "ADMIN" ? (
                  <Link to={"/admin/order"}>Order</Link>
                ) : (
                  <Link to={"/cart"}>Cart</Link>
                )}
              </NavList>
              <NavList>
                <Link to={"/contact"}>Contact</Link>
              </NavList>
              <NavList onClick={switchSidebar}>Store</NavList>
            </Nav>
            <Sidebar sidebar={sidebar} hideSidebar={hideSidebar}></Sidebar>
          </Container>
        ) : (
          <Container>
            <Title>
              <Link to={"/"}>OUR CLOTHING</Link>
            </Title>
            <Searchbar searchbar={searchbar} hideSearchbar={hideSearchbar} />
            <Nav>
              <NavList onClick={switchSearchbar}>Search</NavList>
              <NavList>
                <Link to={"/join"}>Join</Link>
              </NavList>
              <NavList>
                <Link to={"/login"}>Login</Link>
              </NavList>
              <NavList>
                <Link to={"/login"}>Order</Link>
              </NavList>
              <NavList>
                <Link to={"/cart"}>Cart</Link>
              </NavList>
              <NavList>
                <Link to={"/contact"}>Contact</Link>
              </NavList>
              <NavList onClick={switchSidebar}>Store</NavList>
            </Nav>
            <Sidebar sidebar={sidebar} hideSidebar={hideSidebar}></Sidebar>
          </Container>
        )}
      </header>
    </>
  );
}

export default Header;
