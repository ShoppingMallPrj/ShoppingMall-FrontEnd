import { Link } from "react-router-dom";
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
        <CategoryList>
          <Link to={"/mens/new-arrivals"}>New Arrivals</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/mens/outer"}>Outer</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/mens/top"}>Top</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/mens/bottom"}>Bottom</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/mens/shoes"}>Shoes</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/mens/acc"}>Acc</Link>
        </CategoryList>
      </Category>
      <Category>
        <CategoryTitle>Womens</CategoryTitle>
        <CategoryList>
          <Link to={"/womens/new-arrivals"}>New Arrivals</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/womens/outer"}>Outer</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/womens/top"}>Top</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/womens/bottom"}>Bottom</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/womens/shoes"}>Shoes</Link>
        </CategoryList>
        <CategoryList>
          <Link to={"/womens/acc"}>Acc</Link>
        </CategoryList>
      </Category>
      <Category>
        <SpecialList>Sale</SpecialList>
      </Category>
    </OutsideSidebar>
  );
}

export default Sidebar;
