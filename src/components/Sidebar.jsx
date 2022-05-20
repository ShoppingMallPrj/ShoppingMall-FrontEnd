import styled from "styled-components";

const Container = styled.div`
  width: 10.5rem;
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  text-align: right;
  margin-bottom: 2rem;
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
`;
const SpecialList = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: red;
`;

function Sidebar() {
  return (
    <Container>
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
    </Container>
  );
}

export default Sidebar;
