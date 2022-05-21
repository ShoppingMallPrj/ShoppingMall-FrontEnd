import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.8rem 6.2rem;
  font-weight: 600;
  min-width: 84rem;
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
  const switchSidebar = () => {
    setSidebar(!sidebar);
  };
  const hideSidebar = () => {
    setSidebar(false);
  };
  return (
    <>
      <header>
        <Container>
          <Title>Obscura</Title>
          <Nav>
            <NavList>Search</NavList>
            <NavList>Join</NavList>
            <NavList>Login</NavList>
            <NavList>Order</NavList>
            <NavList>Cart</NavList>
            <NavList>Contact</NavList>
            <NavList onClick={switchSidebar}>Store</NavList>
          </Nav>
        </Container>
      </header>
      <Sidebar sidebar={sidebar} hideSidebar={hideSidebar}></Sidebar>
    </>
  );
}

export default Header;
