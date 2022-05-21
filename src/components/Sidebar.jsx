import styled from "styled-components";
import OutsideSidebar from "./OutsideSidebar";

const Category = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  text-align: right;
  margin-bottom: 2rem;
  width: 10.5rem;
`;
const CategoryTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;
const CategoryList = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  overflow-x: hidden;
`;
const SpecialList = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: red;
`;

function Sidebar({ sidebar, hideSidebar }) {
  return (
    <OutsideSidebar sidebar={sidebar} hideSidebar={hideSidebar}>
      <Category>
        <CategoryTitle>Mens</CategoryTitle>
        <CategoryList>New Arrivals</CategoryList>
        <CategoryList>Outer</CategoryList>
        <CategoryList>Top</CategoryList>
        <CategoryList>Bottom</CategoryList>
        <CategoryList>Shoes</CategoryList>
        <CategoryList>Acc</CategoryList>
      </Category>
      <Category>
        <CategoryTitle>Womens</CategoryTitle>
        <CategoryList>New Arrivals</CategoryList>
        <CategoryList>Outer</CategoryList>
        <CategoryList>Top</CategoryList>
        <CategoryList>Bottom</CategoryList>
        <CategoryList>Shoes</CategoryList>
        <CategoryList>Acc</CategoryList>
      </Category>
      <Category>
        <SpecialList>Sale</SpecialList>
      </Category>
    </OutsideSidebar>
  );
}

export default Sidebar;
