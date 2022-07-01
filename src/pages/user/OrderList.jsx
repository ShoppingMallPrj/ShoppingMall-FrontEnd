import { useState, useEffect } from "react";
import { fetchUserOrder } from "../../api";
import Pagenation from "../../components/Pagenation";

function OrderList() {

  const [orderState, setOrderState] = useState({
    content: [],
    totalPages: 0, // 전체 페이지
    isLast: false, //마지막?
    isLoading: false, //로딩중 여부
    isError: false, //에러 여부
  });

  const fetch = async () => {
    try {
      const user = sessionStorage.getItem("user");
      const res = await fetchUserOrder(JSON.parse(user).token);
      const data = await res.json();
      console.log(data)
      setOrderState((inquiryState) => ({
        content: data.content,
        totalPages: data.totalPages,
        isLoading: false,
      }));
      setOrderState((userState) => ({ ...data, isLoading: false }));
    } catch {
      setOrderState((userState) => ({ ...userState, isError: false }));
    }
  };

  const Orders = () => {
    return (
      <>
        주문목록
        {orderState.content.map((order) => {
          return (
            <>
              주문 아이템 목록
              {order.orderList.map((item)=>{
                console.log(item)
                return (
                  <>
                    <h1>{item.itemName}</h1>
                    <h1>{item.itemImage}</h1>
                  </>
                );
              })}
              <h1>{order.orderDate}</h1>
            </>
          );
        })}
      </>
    );
  };

  /* 최초 로딩 (페이지는 0부터 시작함) */
  useEffect(() => {
    fetch(0);
  }, []);

  return (
    <>
      <Orders/>
      <Pagenation
        total={orderState.totalPages}
        onChange={async (page) => fetch(page - 1)}
        //fetch={(page) => fetch(page)}
        hideNav={true}
      ></Pagenation>
    </>
  );
}

export default OrderList;