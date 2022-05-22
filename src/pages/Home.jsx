import styled from "styled-components";
import { useState } from "react";
// import Components
import Footer from "../components/Footer";
import Header from "../components/Header";
// import main images
import mainMens from "../assets/main/main_man.jpeg";
import mainWomens from "../assets/main/main_women.jpeg";
import mainManBottom from "../assets/main/main_man_bottom.jpeg";
import mainWomenBottom from "../assets/main/main_women_bottom.jpeg";
import mainManOuter from "../assets/main/main_man_top.jpeg";
import mainWomenOuter from "../assets/main/main_women_top.jpeg";
import mainShoes from "../assets/main/main_shoes.jpeg";
import mainAcc from "../assets/main/main_acc.jpeg";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 52.7rem);
  grid-template-rows: repeat(4, 90rem);
  gap: 1.3rem;
  justify-content: center;
  min-width: 144rem;
  margin-top: 4.2rem;
  margin-bottom: 22rem;
`;
const Contents = styled.div`
  position: relative;
`;

const Img = styled.img.attrs({})`
  position: relative;
  width: 52.7rem;
  height: 90rem;
  &:first-child,
  :nth-child(4),
  :nth-child(5) {
    border-bottom: 1px solid black;
    box-sizing: content-box;
    padding-bottom: 0.65rem;
  }
  &:hover {
    opacity: 40%;
  }
`;
const Text = styled.span`
  position: absolute;
  margin: 0 auto;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: ${(props) => (props.hover ? 1 : 0)};
`;

function Home() {
  const [hoverArray, setHoverArray] = useState([{}]);
  const onMouseEnter = (event) => {
    setHoverArray((prev) => {
      if (!prev.find((obj) => obj.name === event.target.classList[2])) {
        return [...prev, { name: event.target.classList[2], hover: true }];
      } else {
        return prev.map((obj) => {
          if (obj.name === event.target.classList[2] && obj.hover === false) {
            obj.hover = true;
          }
          return obj;
        });
      }
    });
  };
  const onMouseLeave = (event) => {
    setHoverArray((prev) => {
      return prev.map((obj) => {
        if (obj.name === event.target.classList[2] && obj.hover === true) {
          obj.hover = false;
        }
        return obj;
      });
    });
  };
  return (
    <>
      <Header />
      <main>
        <Container>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainMens} className="mainMens" />
            <Text
              hover={hoverArray.find((obj) => obj.name === "mainMens")?.hover}
            >
              Mens New Arrivals
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainWomens} className="mainWomens" />
            <Text
              hover={hoverArray.find((obj) => obj.name === "mainWomens")?.hover}
            >
              Womens New Arrivals
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainManBottom} className="mainManBottom" />
            <Text
              hover={
                hoverArray.find((obj) => obj.name === "mainManBottom")?.hover
              }
            >
              Mens Bottoms
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainWomenBottom} className="mainWomenBottom" />
            <Text
              hover={
                hoverArray.find((obj) => obj.name === "mainWomenBottom")?.hover
              }
            >
              Womens Bottoms
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainWomenOuter} className="mainWomenOuter" />
            <Text
              hover={
                hoverArray.find((obj) => obj.name === "mainWomenOuter")?.hover
              }
            >
              Womens Outers
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainManOuter} className="mainManOuter" />
            <Text
              hover={
                hoverArray.find((obj) => obj.name === "mainManOuter")?.hover
              }
            >
              Mens Outers
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainShoes} className="mainShoes" />
            <Text
              hover={hoverArray.find((obj) => obj.name === "mainShoes")?.hover}
            >
              Shoes
            </Text>
          </Contents>
          <Contents onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img src={mainAcc} className="mainAcc" />
            <Text
              hover={hoverArray.find((obj) => obj.name === "mainAcc")?.hover}
            >
              Accessories
            </Text>
          </Contents>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Home;
