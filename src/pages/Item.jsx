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
import { useState } from "react";

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
  height: 29rem;
  margin-bottom: 1.2rem;
  text-align: center;
  margin-bottom: 6rem;
`;
const ItemPrice = styled.span`
  width: 33rem;
  margin-bottom: 1.2rem;
  text-align: center;
  margin-bottom: 6rem;
  font-size: 1.3rem;
  font-weight: 600;
`;
const ItemButton = styled.div`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  width: 33rem;
  text-align: center;
`;
const ItemSelect = styled.select`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  width: 33rem;
  margin-bottom: 5rem;
`;
const ItemOption = styled.option``;
const ItemBox = styled.div`
  width: 33rem;
  height: 13.5rem;
  padding: 5rem;
`;
const ItemList = styled.ul``;
const ItemListText = styled.li`
  font-size: 1.3rem;
  font-weight: 600;
`;
const ItemOptionText = styled.span``;
const ItemOptionPrice = styled.span``;
const ItemReview = styled.div`
  width: 52rem;
  height: 20rem;
  border: 1px solid black;
`;
const ItemRelated = styled.div`
  width: 58rem;
`;

function Item() {
  const [item, setItem] = useState([]);
  const {
    state: { id },
  } = useLocation();
  const { isLoading, data } = useQuery(["ItemInfo", id], () =>
    fetchItemInfo(133)
  );
  // console.log(data.images);

  const onSelect = (event) => {
    console.log(event.target.value);
    console.dir(event.target);
    console.log("Hello");
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <ItemImg src={mensNewArrivals} />
          <ItemContents>
            <ItemTexts>
              <ItemTitle>{isLoading ? null : data.itemName}</ItemTitle>
              <ItemBar></ItemBar>
              <ItemPrice>{isLoading ? null : data.itemPrice} KRW</ItemPrice>
              <ItemText>{isLoading ? null : data.itemDescription}</ItemText>
            </ItemTexts>
            <ItemSelect onChange={onSelect}>
              <ItemOption value="">Select Option</ItemOption>
              {isLoading
                ? null
                : data.options.map((option) => {
                    return (
                      <ItemOption
                        key={option.optionId}
                        value={option.optionId}
                        name={option.optionContent}
                      >
                        {option.optionContent}
                      </ItemOption>
                    );
                  })}
            </ItemSelect>
            <ItemList>
              <ItemListText>
                <ItemOptionText></ItemOptionText>
                <ItemOptionPrice></ItemOptionPrice>
              </ItemListText>
            </ItemList>
            <ItemButton>Add to Cart</ItemButton>
          </ItemContents>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Item;
