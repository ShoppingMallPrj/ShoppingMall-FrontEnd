import { atom } from "recoil";

export const loginState = atom({
  key: "login",
  default: {
    user: false,
    userRole: null,
    token: null,
  },
});

export const ItemListState = atom({
  key: "ItemList",
  default: [],
});
