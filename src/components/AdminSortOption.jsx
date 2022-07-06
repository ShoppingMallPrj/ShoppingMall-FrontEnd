import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchItemList } from "../api";
import { ItemListState } from "../atoms";

const SortForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2rem;
  margin-top: 1rem;
`;
const SortCheckbox = styled.input.attrs({ type: "radio" })``;
const SortLabel = styled.label`
  font-size: 1.5rem;
`;

function AdminSortOption() {
  const [category, setCategory] = useState({
    categoryName: "",
    checked: false,
  });
  const [gender, setGender] = useState({
    genderName: "",
    checked: false,
  });
  const setItemList = useSetRecoilState(ItemListState);
  const { refetch, isLoading, data } = useQuery("SortedItemList", () =>
    fetchItemList(category.categoryName, gender.genderName)
  );
  useEffect(() => {
    refetch();
    if (isLoading === false) {
      setItemList(data.content);
    }
  }, [category, gender, refetch, isLoading, data, setItemList]);
  const onChangeCategory = (event) => {
    setCategory(() => {
      return {
        categoryName: event.target.value,
        checked: event.target.checked,
      };
    });
  };
  const onClickCategory = (event) => {
    if (category.categoryName === event.target.value) {
      setCategory(() => {
        return {
          categoryName: "",
          checked: false,
        };
      });
    }
  };
  const onChangeGender = (event) => {
    setGender(() => {
      return {
        genderName: event.target.value,
        checked: event.target.checked,
      };
    });
  };
  const onClickGender = (event) => {
    if (gender.genderName === event.target.value) {
      setGender(() => {
        return {
          genderName: "",
          checked: false,
        };
      });
    }
  };
  return (
    <>
      <SortForm>
        <SortLabel onClick={onClickGender} htmlFor="Men">
          <SortCheckbox
            onChange={onChangeGender}
            name="gender"
            id="Men"
            value="m"
            checked={gender.genderName === "m" && gender.checked}
          />
          Men
        </SortLabel>
        <SortLabel onClick={onClickGender} htmlFor="Women">
          <SortCheckbox
            onChange={onChangeGender}
            name="gender"
            id="Women"
            value="w"
            checked={gender.genderName === "w" && gender.checked}
          />
          Women
        </SortLabel>
        <SortLabel onClick={onClickCategory} htmlFor="Top">
          <SortCheckbox
            onChange={onChangeCategory}
            name="category"
            id="Top"
            value="top"
            checked={category.categoryName === "top" && category.checked}
          />
          Top
        </SortLabel>
        <SortLabel onClick={onClickCategory} htmlFor="Bottom">
          <SortCheckbox
            onChange={onChangeCategory}
            name="category"
            id="Bottom"
            value="bottom"
            checked={category.categoryName === "bottom" && category.checked}
          />
          Bottom
        </SortLabel>
        <SortLabel onClick={onClickCategory} htmlFor="Outer">
          <SortCheckbox
            onChange={onChangeCategory}
            name="category"
            id="Outer"
            value="outer"
            checked={category.categoryName === "outer" && category.checked}
          />
          Outer
        </SortLabel>
        <SortLabel onClick={onClickCategory} htmlFor="Shoes">
          <SortCheckbox
            onChange={onChangeCategory}
            name="category"
            id="Shoes"
            value="shoes"
            checked={category.categoryName === "shoes" && category.checked}
          />
          Shoes
        </SortLabel>
        <SortLabel onClick={onClickCategory} htmlFor="Acc">
          <SortCheckbox
            onChange={onChangeCategory}
            name="category"
            id="Acc"
            value="acc"
            checked={category.categoryName === "acc" && category.checked}
          />
          Acc
        </SortLabel>
      </SortForm>
    </>
  );
}

export default AdminSortOption;
