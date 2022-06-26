import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AdminSearchbar from "../../components/AdminSearchbar";
import { useQuery } from "react-query";
import { fetchItemList } from "../../api";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ItemListState } from "../../atoms";
import AdminSortOption from "../../components/AdminSortOption";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 95rem;
  height: 92rem;
  min-width: 144rem;
  margin-top: 7rem;
  margin-bottom: 22rem;
`;
const AddedItemSearch = styled.div`
  position: absolute;
  top: -3rem;
  left: 25rem;
`;
const AddedItemMenu = styled.div`
  width: 74rem;
  height: 87rem;
`;
const TitleList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 3fr repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 74rem;
  height: 4rem;
  border: 1px solid black;
`;
const Title = styled.li`
  justify-items: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 600;
`;
const ItemList = styled.ul`
  width: 74rem;
  height: 83rem;
  border: 1px solid black;
  border-top: none;
  padding: 2rem 2rem;
`;
const Item = styled.li`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 6rem 36rem 7rem 14rem 7rem;
  justify-items: center;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid black;
`;
const ItemInfo = styled.span`
  font-size: 1.2rem;
`;
const SortMenu = styled.div`
  width: 21rem;
  height: 87rem;
  border: 1px solid black;
  border-left: none;
`;
const SortTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 4rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

function AdminItemList() {
  const { data, isLoading } = useQuery("AddedItemList", () => fetchItemList());
  const [itemList, setItemList] = useRecoilState(ItemListState);
  useEffect(() => {
    if (isLoading === false) {
      setItemList(data.content);
    }
  }, [isLoading, data, setItemList]);
  return (
    <>
      <Header />
      <main>
        <Container>
          <AddedItemSearch>
            <AdminSearchbar />
          </AddedItemSearch>
          <AddedItemMenu>
            <TitleList>
              <Title>No</Title>
              <Title>Name</Title>
              <Title>Category</Title>
              <Title>Price</Title>
              <Title>Stock</Title>
            </TitleList>
            <ItemList>
              {itemList?.map((item) => {
                return (
                  <Item key={item.itemId}>
                    <ItemInfo>{itemList.indexOf(item) + 1}</ItemInfo>
                    <ItemInfo>{item.itemName}</ItemInfo>
                    <ItemInfo>{item.itemCategory}</ItemInfo>
                    <ItemInfo>{`₩${item.itemPrice}`}</ItemInfo>
                    <ItemInfo>{item.options[0].optionStock}</ItemInfo>
                  </Item>
                );
              })}
            </ItemList>
          </AddedItemMenu>
          <SortMenu>
            <SortTitle>Sort</SortTitle>
            <AdminSortOption />
          </SortMenu>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AdminItemList;
