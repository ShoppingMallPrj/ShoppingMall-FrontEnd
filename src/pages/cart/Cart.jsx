import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchItemDetail } from "../../api";

// import Components
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const styledImage = styled.img`
  width: 100px;
  height: 100px;
`;

function Cart() {
  const navigate = useNavigate();
  const [cartState, setCartState] = useState({
    cartItems: [],
    isLoading: false,
    isError: false,
  });
  const [isAllChecked, setIsAllChecked] = useState(false);

  //데이터 하나 요청해서 로컬 스토리지에 넣는다.
  const testFetch = async () => {
    try {
      const res = await fetchItemDetail(120);
      const item = await res.json();
      const cartItem = {
        ...item,
        quantity: 1,
        isSelected: false,
        optionSelected: 47,
      };
      console.log(cartItem);
      const arr = JSON.parse(window.localStorage.getItem("cart")) || [];
      arr.push(cartItem);
      window.localStorage.setItem("cart", JSON.stringify(arr));
      console.log(await res.json());
    } catch (error) {}
  };

  useEffect(() => {
    //set some samples
    //testFetch();
    const items = JSON.parse(window.localStorage.getItem("cart")) || [];

    setCartState({
      cartItems: items,
      isLoading: false,
      isError: false,
    });
  }, []);

  //현재 state를 저장
  const saveState = () => {
    window.localStorage.setItem("cart", JSON.stringify(cartState.cartItems));
  };

  //옵션이 선택될 경우
  const selectOption = (event, index) => {
    const newState = cartState.cartItems;
    newState[index].optionSelected = parseInt(event.target.value, 10);
    setCartState((state) => ({ ...state, cartItems: newState }));
  };

  //체크박스의 아이템 전체 선택
  const selectAll = (event) => {
    let isChecked = event.target.checked;
    setIsAllChecked(isChecked);
    const newState = cartState.cartItems;
    newState.forEach((item) => {
      item.isSelected = isChecked;
    });
    setCartState((state) => ({ ...state, cartItems: newState }));
  };

  //체크박스의 아이템 개별 선택
  const selectItem = (event, index) => {
    let isChecked = event.target.checked;
    const newState = cartState.cartItems;
    newState[index].isSelected = isChecked;
    setCartState((state) => ({ ...state, cartItems: newState }));
  };

  //해당 아이템 카트에서 삭제
  const deleteItem = (index) => {
    const newItems = cartState.cartItems.filter((data, i) => i !== index);
    setCartState((state) => ({ ...state, cartItems: newItems }));
    saveState();
  };

  //수량 증가
  const updateQuantity = (index, num) => {
    const newState = cartState.cartItems;

    if (num < 0 && newState[index].quantity === 1) return;
    newState[index].quantity += num;
    setCartState((state) => ({ ...state, cartItems: newState }));
    saveState();
  };

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartState.cartItems));
  }, [cartState.cartItems]);

  /*테이블의 아이템 정보 부분 */
  const ItemInfo = ({ item, index }) => {
    return (
      <>
        <img
          style={{ height: "100px", width: "100px" }}
          src={item.itemProfile}
          alt="image"
        />
        <div>{item.itemName}</div>
        <div>
          option :
          {
            item.options.filter(
              (option) => option.optionId === item.optionSelected
            )[0].optionContent
          }
        </div>
        <select
          defaultValue={item.optionSelected}
          onChange={(e) => selectOption(e, index)}
        >
          {item.options.map((option) => {
            return (
              <option value={option.optionId}>{option.optionContent}</option>
            );
          })}
        </select>
      </>
    );
  };

  /* 상품 총 합계 계산하는 함수 */
  const Total = () => {
    let total = 0;
    cartState.cartItems.forEach((item) => {
      if (item.isSelected) {
        total += item.itemPrice * item.quantity;
      }
    });
    return <>total : {total}</>;
  };

  const Body = () => {
    if (cartState.isLoading) return <>LOADING...</>;
    if (cartState.isError) return <>ERROR</>;

    return (
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={selectAll}
              />
            </th>
            <th>정보</th>
            <th>가격</th>
            <th>수량</th>
            <th>합계</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {cartState.cartItems.map((item, index) => {
            return (
              <>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={(e) => {
                        selectItem(e, index);
                      }}
                    />
                  </td>
                  <td>
                    <ItemInfo item={item} index={index} />
                  </td>
                  <td>{item.itemPrice} WON</td>
                  <td>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                  </td>
                  <td>{item.quantity * item.itemPrice}</td>
                  <td>
                    <button onClick={() => deleteItem(index)}>삭제</button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  };

  //선택된 아이템만 가져와서 order page로 이동
  const toOrder = () => {
    const item = cartState.cartItems.filter((item) => item.isSelected === true);
    if (item.length === 0) return;

    navigate("/order", {
      state: {
        item: item,
      },
    });
  };

  return (
    <>
      <Header />
      <Body />
      <Total />
      <button onClick={toOrder}>주문하기</button>
      <Footer />
    </>
  );
}

export default Cart;
