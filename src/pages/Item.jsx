import { useQuery } from "react-query";
import styled from "styled-components";
// import Components
import Footer from "../components/Footer";
import Header from "../components/Header";
// import Mens New Arrivlas images
import mensNewArrivals from "../assets/mens/new-arrivals/mens_outer1.webp";
// import mensNewArrivals2 from "../../assets/mens/new-arrivals/mens_bottom1.webp";
// import mensNewArrivals3 from "../../assets/mens/new-arrivals/mens_outer2.webp";
// import mensNewArrivals4 from "../../assets/mens/new-arrivals/mens_top1.webp";
// import mensNewArrivals5 from "../../assets/mens/new-arrivals/acc.webp";
// import mensNewArrivals6 from "../../assets/mens/new-arrivals/mens_outer3.webp";
// import mensNewArrivals7 from "../../assets/mens/new-arrivals/mens_bottom2.webp";
// import mensNewArrivals8 from "../../assets/mens/new-arrivals/mens_bottom3.webp";
// import mensNewArrivals9 from "../../assets/mens/new-arrivals/shoes1.webp";
// import mensNewArrivals10 from "../../assets/mens/new-arrivals/mens_outer4.webp";
// import mensNewArrivals11 from "../../assets/mens/new-arrivals/mens_bottom4.webp";
// import mensNewArrivals12 from "../../assets/mens/new-arrivals/mens_outer5.webp";
import { useLocation } from "react-router-dom";
import { fetchItemInfo } from "../api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-width: 144rem;
  margin-top: 4.2rem;
  margin-bottom: 22rem;
`;
const ItemContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72rem;
  height: 82rem;
  padding: 6rem 14rem;
`;
const ItemImg = styled.img`
  width: 52rem;
  height: 82rem;
  margin: 0 10rem;
  margin-bottom: 1.8rem;
  cursor: pointer;
`;
const ItemTexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;
const ItemTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;
const ItemBar = styled.div`
  width: 4rem;
  height: 1rem;
  border-bottom: 1px solid black;
  margin-bottom: 6rem;
`;
const ItemText = styled.span`
  width: 33rem;
  margin-bottom: 1.2rem;
  text-align: center;
  margin-bottom: 6rem;
  cursor: pointer;
`;
const ItemButton = styled.div`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
`;
const ItemList = styled.ul``;
const ItemListText = styled.li``;

function Item() {
  const {
    state: { id },
  } = useLocation();
  const { data } = useQuery(["ItemInfo", id], () => fetchItemInfo(id));

  return (
    <>
      <Header />
      <main>
        <Container>
          <ItemImg src={mensNewArrivals} />
          <ItemContents>
            <ItemTexts>
              <ItemTitle>{data.itemName}</ItemTitle>
              <ItemBar></ItemBar>
              <ItemText>{data.itemDescription}</ItemText>
            </ItemTexts>
            <ItemButton>Select Option</ItemButton>
            <ItemList></ItemList>
            <ItemButton>Add to Cart</ItemButton>
          </ItemContents>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Item;
