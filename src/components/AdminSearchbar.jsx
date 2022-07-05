import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchSearchItemList } from "../api";
import { ReactComponent as SearchGlass } from "../assets/logo/searchGlass.svg";
import { ReactComponent as XSolid } from "../assets/logo/x-solid.svg";
import { ItemListState } from "../atoms";

const Search = styled.div``;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 36rem;
  border: none;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;
const SearchImg = styled.button`
  display: flex;
  height: 2rem;
  border: none;
  margin-left: 0.5rem;
  background-color: transparent;
  cursor: pointer;
  &:last-child {
    margin-right: 0.3rem;
  }
`;

function AdminSearchbar() {
  const { register, handleSubmit } = useForm();
  const setItemList = useSetRecoilState(ItemListState);
  const [keyword, setKeyword] = useState("");
  const {
    isLoading,
    data: dataList,
    refetch,
  } = useQuery("SearchedItemList", () => fetchSearchItemList(keyword));
  const onSubmit = (data, event) => {
    setKeyword(data.keyword);
    event.target[0].value = "";
  };
  useEffect(() => {
    refetch();
    if (isLoading === false) {
      setItemList(dataList.content);
    }
  }, [keyword, refetch, setItemList, dataList, isLoading]);

  return (
    <Search>
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchInput {...register("keyword")} type="text"></SearchInput>
        <SearchImg>
          <SearchGlass width="15px" />
        </SearchImg>
        <SearchImg>
          <XSolid width="12px" />
        </SearchImg>
      </SearchForm>
    </Search>
  );
}

export default AdminSearchbar;
