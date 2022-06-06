import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SearchGlass } from "../assets/logo/searchGlass.svg";
import { ReactComponent as XSolid } from "../assets/logo/x-solid.svg";
import OutsideSearchbar from "./OutsideSearchbar";

const Search = styled.div``;
const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: height 0.5s;
  overflow-y: hidden;
`;
const SearchInput = styled.input`
  width: 36rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
const SearchImg = styled.button`
  display: flex;
  height: ${(props) => (props.searchbar ? "2rem" : 0)};
  overflow-y: hidden;
  white-space: nowrap;
  transition: height 0.5s;
  border: none;
  margin-left: 0.5rem;
  background-color: transparent;
  cursor: pointer;
  &:last-child {
    margin-right: 0.3rem;
  }
`;

function Searchbar({ searchbar, hideSearchbar }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    return navigate(`/search/${data.keyword}`);
  };
  return (
    <OutsideSearchbar searchbar={searchbar} hideSearchbar={hideSearchbar}>
      <Search>
        <SearchForm onSubmit={handleSubmit(onSubmit)}>
          <SearchInput {...register("keyword")} type="text"></SearchInput>
          <SearchImg searchbar={searchbar}>
            <SearchGlass width="15px" />
          </SearchImg>
          <SearchImg searchbar={searchbar}>
            <XSolid width="12px" />
          </SearchImg>
        </SearchForm>
      </Search>
    </OutsideSearchbar>
  );
}

export default Searchbar;
