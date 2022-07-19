import { useQuery } from "react-query";
import { fetchCategoryItemList, fetchNewArriavlsMens } from "../../api";
import styled from "styled-components";
// import Components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import Mens New Arrivlas images
import mensNewArrivals from "../../assets/mens/new-arrivals/mens_outer1.webp";
import mensNewArrivals2 from "../../assets/mens/new-arrivals/mens_bottom1.webp";
import mensNewArrivals3 from "../../assets/mens/new-arrivals/mens_outer2.webp";
import mensNewArrivals4 from "../../assets/mens/new-arrivals/mens_top1.webp";
import mensNewArrivals5 from "../../assets/mens/new-arrivals/acc.webp";
import mensNewArrivals6 from "../../assets/mens/new-arrivals/mens_outer3.webp";
import mensNewArrivals7 from "../../assets/mens/new-arrivals/mens_bottom2.webp";
import mensNewArrivals8 from "../../assets/mens/new-arrivals/mens_bottom3.webp";
import mensNewArrivals9 from "../../assets/mens/new-arrivals/shoes1.webp";
import mensNewArrivals10 from "../../assets/mens/new-arrivals/mens_outer4.webp";
import mensNewArrivals11 from "../../assets/mens/new-arrivals/mens_bottom4.webp";
import mensNewArrivals12 from "../../assets/mens/new-arrivals/mens_outer5.webp";
import { Link } from "react-router-dom";

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

function TopMens() {
  const { isLoading, data } = useQuery("TopMens", () =>
    fetchCategoryItemList("top", "m")
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

export default TopMens;
