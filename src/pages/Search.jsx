import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchSearchItemList } from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 35.5rem);
  grid-template-rows: repeat(4, 59.7rem);
  row-gap: 2.7rem;
  column-gap: 1.3rem;
  justify-content: center;
  min-width: 144rem;
  margin-top: 4.2rem;
  margin-bottom: 22rem;
`;
const Contents = styled.div``;

const Img = styled.img`
  width: 35.5rem;
  height: 52.8rem;
  margin-bottom: 1.8rem;
  cursor: pointer;
`;
const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
`;
const Text = styled.span`
  margin-bottom: 1.2rem;
  cursor: pointer;
  &:last-child {
    font-weight: 400;
  }
`;

function Search() {
  const { keyword } = useParams();
  const { isLoading, data } = useQuery(["searchItemList", keyword], () =>
    fetchSearchItemList(keyword)
  );

  return (
    <>
      <Header />
      <main>
        <Container>
          {isLoading
            ? null
            : data.content.map((item) => {
                const itemName = item.itemName.split(" ");
                const newItemName = itemName.join("-");
                return (
                  <Contents key={item.itemId}>
                    <Link
                      to={`/item/${newItemName}`}
                      state={{ id: item.itemId }}
                    >
                      <Img src={item.itemProfile}></Img>
                      <Texts>
                        <Text>{item.itemName}</Text>
                        <Text>₩ {item.itemPrice}</Text>
                      </Texts>
                    </Link>
                  </Contents>
                );
              })}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Search;
