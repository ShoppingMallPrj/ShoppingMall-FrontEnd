import { useQuery } from "react-query";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import Components
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchItemInfo } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 144rem;
  margin-top: 4.2rem;
  margin-bottom: 22rem;
`;
const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  min-width: 144rem;
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
  margin-bottom: 3rem;
`;
const ItemText = styled.span`
  width: 28rem;
  height: 29rem;
  margin-bottom: 1.2rem;
  text-align: center;
  margin-bottom: 6rem;
  font-size: 1.4rem;
  line-height: 2rem;
`;
const ItemPrice = styled.span`
  width: 33rem;
  margin-bottom: 3rem;
  text-align: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 144rem;
`;
const ItemRelatedHead = styled.div`
  width: 124rem;
  text-align: left;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 10rem;
  margin-bottom: 1rem;
`;
const ItemRelatedContents = styled.div`
  display: flex;
  width: 124rem;
  justify-content: space-between;
  padding-top: 5rem;
  border-top: 1px solid black;
`;
const ItemRelatedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemRelatedImg = styled.img`
  margin-bottom: 1rem;
  width: 20rem;
  height: 30rem;
`;
const ItemRelatedText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ItemRelatedTitle = styled.span`
  width: 20rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
`;
const ItemRelatedPrice = styled.span`
  font-size: 1.4rem;
`;

function Item() {
  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [option, setOption] = useState("");
  const {
    state: { id },
  } = useLocation();
  const { isLoading, data } = useQuery(["ItemInfo", id], () =>
    fetchItemInfo(id)
  );

  const onSelect = (event) => {
    setOption(event.target.value);
    setItem((info) => {
      return [
        ...info,
        {
          ...data,
          optionSelected: event.target.value,
          quantity: 1,
          isSelected: false,
        },
      ];
    });
  };

  const onClick = (event) => {
    if (!option) {
      event.preventDefault();
      console.log("prevented");
    } else {
      localStorage.setItem("cart", JSON.stringify(item));
    }
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <ItemInfo>
            <ItemImg src={data?.itemProfile} />
            <ItemContents>
              <ItemTexts>
                <ItemTitle>{data?.itemName}</ItemTitle>
                <ItemBar></ItemBar>
                <ItemPrice>{data?.itemPrice} KRW</ItemPrice>
                <ItemText>{data?.itemDescription}</ItemText>
              </ItemTexts>
              <ItemSelect onChange={onSelect}>
                <ItemOption value="">Select Option</ItemOption>
                {isLoading
                  ? null
                  : data.options.map((option) => {
                      return (
                        <ItemOption
                          key={option.optionId}
                          value={option.optionContent}
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
              <ItemButton onClick={onClick}>Add to Cart</ItemButton>
            </ItemContents>
          </ItemInfo>
          <ItemRelated>
            <ItemRelatedHead>Related Items</ItemRelatedHead>
            <ItemRelatedContents>
              {isLoading
                ? null
                : data.related.slice(0, 5).map((item) => {
                    const itemName = item.itemName.split(" ");
                    const newItemName = itemName.join("-");
                    return (
                      <ItemRelatedContent key={item.itemId}>
                        <Link
                          to={`/item/${newItemName}`}
                          state={{ id: item.itemId }}
                        >
                          <ItemRelatedImg src={item.itemProfile} />
                        </Link>
                        <ItemRelatedText>
                          <ItemRelatedTitle>{item.itemName}</ItemRelatedTitle>
                          <ItemRelatedPrice>
                            ₩ {item.itemPrice}
                          </ItemRelatedPrice>
                        </ItemRelatedText>
                      </ItemRelatedContent>
                    );
                  })}
            </ItemRelatedContents>
          </ItemRelated>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Item;
