import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchItemDetail } from "../../api";

// import Components
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Container = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 124rem;
`;

function Cart() {
  const navigate = useNavigate();
  const [cartState, setCartState] = useState({
    cartItems: [],
    isLoading: false,
    isError: false,
  });
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    setCartState({
      cartItems: items,
      isLoading: false,
      isError: false,
    });
    console.log(items);
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

  // useEffect(() => {
  //   window.localStorage.setItem("cart", JSON.stringify(cartState.cartItems));
  // }, [cartState.cartItems]);

  const ContainerItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const ItemInfoImg = styled.img`
    height: 25rem;
    width: 15rem;
    margin-bottom: 2rem;
  `;
  const ItemInfoTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
  `;
  const ItemInfoText = styled.div`
    display: flex;
    flex-direction: column;
  `;

  /*테이블의 아이템 정보 부분 */
  const ItemInfo = ({ item, index }) => {
    return (
      <ContainerItemInfo>
        <ItemInfoImg src={item.itemProfile} alt="new" />
        <ItemInfoText>
          <ItemInfoTitle>{item.itemName}</ItemInfoTitle>
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
        </ItemInfoText>
      </ContainerItemInfo>
    );
  };
  const TotalInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20rem;
    margin-top: 10rem;
    margin-bottom: 22rem;
  `;
  const TotalTitle = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
  `;
  const TotalButton = styled.button`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: 600;
    cursor: pointer;
  `;

  /* 상품 총 합계 계산하는 함수 */
  const Total = () => {
    let total = 0;
    cartState.cartItems.forEach((item) => {
      if (item.isSelected) {
        total += item.itemPrice * item.quantity;
      }
    });
    return <TotalTitle>Total : {total}</TotalTitle>;
  };

  const CartIndex = styled.thead`
    width: 100rem;
    height: 5rem;
    padding: 5rem;
    border: 1px solid black;
  `;
  const CartIndexRow = styled.div`
    display: flex;
    width: 100rem;
  `;
  const CartIndexHead = styled.div`
    font-size: 1.4rem;
    text-align: center;
    &:first-child {
      width: 5%;
    }
    &:nth-child(2) {
      width: 35%;
    }
    &:nth-child(3) {
      width: 15%;
    }
    &:nth-child(4) {
      width: 15%;
    }
    &:nth-child(5) {
      width: 12%;
    }
    &:last-child {
      width: 11%;
    }
  `;
  const CartIndexCheckbox = styled.input``;
  const CartItems = styled.tbody`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100rem;
    padding: 5rem;
    border: 1px solid black;
    border-top: 0;
  `;
  const CartItemRow = styled.tr`
    display: flex;
    width: 100rem;
    justify-content: space-between;
    align-items: center;
    padding: 5rem;
  `;
  const CartItemInfo = styled.div`
    display: flex;
  `;
  const CartItemDesription = styled.td`
    /* line-height: 5rem; */
    text-align: center;
  `;
  const CartItemCheckbox = styled.input``;
  const CartItemPrice = styled.td`
    font-size: 1.4rem;
    font-weight: 500;
  `;
  const CartIemButton = styled.button`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
  `;
  const CartMainText = styled.div`
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: 6.5rem;
  `;

  const Body = () => {
    if (cartState.isLoading) return <>LOADING...</>;
    if (cartState.isError) return <>ERROR</>;

    return (
      <Container>
        <CartMainText>Cart</CartMainText>
        <CartIndex>
          <CartIndexRow>
            <CartIndexHead>
              <CartIndexCheckbox
                type="checkbox"
                checked={isAllChecked}
                onChange={selectAll}
              />
            </CartIndexHead>
            <CartIndexHead>정보</CartIndexHead>
            <CartIndexHead>가격</CartIndexHead>
            <CartIndexHead>수량</CartIndexHead>
            <CartIndexHead>합계</CartIndexHead>
            <CartIndexHead>상태</CartIndexHead>
          </CartIndexRow>
        </CartIndex>
        <CartItems>
          {cartState.cartItems.map((item, index) => {
            return (
              <>
                <CartItemRow>
                  <CartItemDesription key={item.itemId}>
                    <CartItemCheckbox
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={(e) => {
                        selectItem(e, index);
                      }}
                    />
                  </CartItemDesription>
                  <CartItemDesription>
                    <ItemInfo item={item} index={index} />
                  </CartItemDesription>
                  <CartItemPrice>{item.itemPrice} WON</CartItemPrice>
                  <CartItemDesription>
                    <CartIemButton onClick={() => updateQuantity(index, 1)}>
                      +
                    </CartIemButton>
                    {item.quantity}
                    <CartIemButton onClick={() => updateQuantity(index, -1)}>
                      -
                    </CartIemButton>
                  </CartItemDesription>
                  <CartItemPrice>
                    {item.quantity * item.itemPrice}
                  </CartItemPrice>
                  <CartItemDesription>
                    <CartIemButton onClick={() => deleteItem(index)}>
                      삭제
                    </CartIemButton>
                  </CartItemDesription>
                </CartItemRow>
              </>
            );
          })}
        </CartItems>
        <TotalInfo>
          <Total />
          <TotalButton onClick={toOrder}>주문하기</TotalButton>
        </TotalInfo>
      </Container>
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
      <cartIndex></cartIndex>
      <Body />
      <Footer />
    </>
  );
}

export default Cart;
