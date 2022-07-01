import styled from "styled-components";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchOrder } from "../../api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderForm from "./OrderForm";

function Order() {

  const { state } = useLocation();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    
    const orderList = [];
    
    /* 상품 리스트 form에 추가 */
    state.item.map((item, index)=>{
      const order = {
        itemId: item.itemId,
        optionId: item.optionSelected,
        itemStock: item.quantity,
      };
      orderList.push(order);
    })

    const formData = { ...data, orderList: orderList};

    try {
      const token = JSON.parse(sessionStorage.getItem("user")).token;
      const res = await fetchOrder(token, JSON.stringify(formData));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const ItemInfo = ({ item }) => {
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
      </>
    );
  };

  useEffect(() => {
    //window.localStorage.setItem("cart", JSON.stringify(cartState.cartItems));
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* 상품 목록 */}
        <div>
          <table>
            <thead>
              <tr>
                <th>정보</th>
                <th>가격</th>
                <th>수량</th>
                <th>합계</th>
              </tr>
            </thead>
            <tbody>
              {state.item.map((item, index) => {
                return (
                  <tr>
                    <td>
                      <ItemInfo item={item} />
                    </td>
                    <td>{item.itemPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.itemPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <div>
          <OrderForm onSubmit={onSubmit}></OrderForm>
        </div>
        orderPage
      </main>
      <Footer />
    </>
  );
}

export default Order;
