import { useQuery } from "react-query";
import { fetchNewArriavlsMens } from "../../api";
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

function NewArrivalsWomens() {
  const { isLoading, data } = useQuery(
    "newArrivalsWomens",
    fetchNewArriavlsMens
  );
  console.log(data);
  return (
    <>
      <Header />
      <main>
        <Container>
          <Contents>
            <Img src={mensNewArrivals}></Img>
            <Texts>
              <Text>TAVERN BLAZER GREY TROPICAL WOOL</Text>
              <Text>₩ 759,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals2}></Img>
            <Texts>
              <Text>HIGH TOP CHINO GREY TROPICAL WOOL</Text>
              <Text>₩ 479,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals3}></Img>
            <Texts>
              <Text>CLOAK PARKA OLIVE RUBBER FILM</Text>
              <Text>₩ 998,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals4}></Img>
            <Texts>
              <Text>POPOVER ROUNDNECK GREY BOUCLE</Text>
              <Text>₩ 386,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals5}></Img>
            <Texts>
              <Text>SLIM BACKPACK ARMY GREEN TECH RIPSTOP</Text>
              <Text>₩ 267,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals6}></Img>
            <Texts>
              <Text>CARDIGAN BABY BLUE MOHAIR</Text>
              <Text>₩ 452,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals7}></Img>
            <Texts>
              <Text>TREKKING CARGO ARMY GREEN HIGH TWIST SOLARO</Text>
              <Text>₩ 455,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals8}></Img>
            <Texts>
              <Text>SABOT CUT BLACK ORGANZA</Text>
              <Text>₩ 556,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals9}></Img>
            <Texts>
              <Text>SPLINTER SKY</Text>
              <Text>₩ 467,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals10}></Img>
            <Texts>
              <Text>SHRUNKEN FULLZIP POLO BLACK RAYON PLAIT</Text>
              <Text>₩ 387,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals11}></Img>
            <Texts>
              <Text>TREKKING CARGO SHORTS ARMY GREEN COTTON RIPSTOP</Text>
              <Text>₩ 365,000</Text>
            </Texts>
          </Contents>
          <Contents>
            <Img src={mensNewArrivals12}></Img>
            <Texts>
              <Text>SHRUNKEN FULLZIP POLO BEIGE ROPE WEAVE</Text>
              <Text>₩ 423,000</Text>
            </Texts>
          </Contents>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default NewArrivalsWomens;
