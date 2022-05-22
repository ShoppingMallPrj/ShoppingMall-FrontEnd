import styled from "styled-components";
import { ReactComponent as SearchGlass } from "../assets/logo/searchGlass.svg";
import { ReactComponent as XSolid } from "../assets/logo/x-solid.svg";

const Container = styled.div`
  width: 42rem;
  height: ${(props) => (props.searchbar ? "1.8rem" : 0)};
  position: absolute;
  top: 5rem;
  right: 0;
  overflow-y: hidden;
  border-bottom: ${(props) => (props.searchbar ? "1px solid black" : "none")};
  transition: height 0.5s;
`;
const Search = styled.div`
  display: flex;
  transition: height 0.5s;
  justify-content: space-between;
  align-items: center;
  overflow-y: hidden;
`;
const SearchForm = styled.form``;
const SearchInput = styled.input`
  width: 38rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
const SearchImgs = styled.div`
  height: ${(props) => (props.searchbar ? "2rem" : 0)};
  overflow-y: hidden;
  transition: height 0.5s;
`;
const SearchImg = styled.span`
  margin-left: 0.5rem;
  &:last-child {
    margin-right: 0.3rem;
  }
`;

function Searchbar({ searchbar }) {
  return (
    <Container searchbar={searchbar}>
      <Search>
        <SearchForm>
          <SearchInput type="text"></SearchInput>
        </SearchForm>
        <SearchImgs searchbar={searchbar}>
          <SearchImg>
            <SearchGlass width="15px" />
          </SearchImg>
          <SearchImg>
            <XSolid width="12px" />
          </SearchImg>
        </SearchImgs>
      </Search>
    </Container>
  );
}

export default Searchbar;
