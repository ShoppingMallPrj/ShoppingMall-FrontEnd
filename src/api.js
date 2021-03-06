const BASE_URL = "http://13.125.219.49";
// const BASE_URL = "https://shoppingmall-app.herokuapp.com";

export async function fetchNewArriavlsMens() {
  return await (
    await fetch(`${BASE_URL}/api/item/list?keyword=&gender=`)
  ).json();
}
export async function fetchSearchItemList(keyword) {
  return await (
    await fetch(`${BASE_URL}/api/item/list/search?keyword=${keyword}`)
  ).json();
}
export async function fetchItemList(keyword = "", gender = "") {
  return await (
    await fetch(
      `${BASE_URL}/api/item/list/?keyword=${keyword}&gender=${gender}`
    )
  ).json();
}
export async function fetchGenderItemList(gender) {
  return await (
    await fetch(`${BASE_URL}/api/item/list/gender?gender=${gender}`)
  ).json();
}
export async function fetchCategoryItemList(category, gender) {
  return await (
    await fetch(
      `${BASE_URL}/api/item/list/cate?category=${category}&gender=${gender}`
    )
  ).json();
}
export async function fetchItemInfo(id) {
  return await (await fetch(`${BASE_URL}/api/item/${id}`)).json();
}
export async function fetchUserEmailJoin(data) {
  return await fetch(`${BASE_URL}/api/user/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
export async function fetchUserEmailLogin(data) {
  return await fetch(`${BASE_URL}/api/login/email`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
export async function fetchUserKakaoLogin(code) {
  return await fetch(`${BASE_URL}/api/login/kakao?code=${code}`);
}
export async function fetchUserGoogleLogin(tokenId) {
  return await fetch(`${BASE_URL}/api/login/google?tokenId=${tokenId}`);
}
// fetch Test Data
export async function fetchCreateTestData(data) {
  return await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

//form dat??? ????????? ???????????? ????????????.
export async function fetchCreateItem(data) {
  return await fetch(`${BASE_URL}/api/item/create`, {
    method: "POST",
    body: data,
  });
}

/* Item??? ?????? ????????????.*/
export async function fetchItemDetail(itemId) {
  return await fetch(`${BASE_URL}/api/item/${itemId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

/* ???????????? ????????? ????????? ?????? */
export async function fetchInquiry({ page, size }) {
  return await (
    await fetch(`${BASE_URL}/api/inquiry/list?page=${page}&size=${size}`, {
      method: "GET",
    })
  ).json();
}

/* ???????????? ????????? 1??? ?????? */
export async function fetchInquiryDetail(inquiryId) {
  return await (
    await fetch(`${BASE_URL}/api/inquiry/${inquiryId}?pw=?`, {
      method: "GET",
    })
  ).json();
}

/* ???????????? ?????? */
export async function createInquiry(token, data) {
  return await fetch(`${BASE_URL}/api/inquiry/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
}

/* ???????????? ?????? */
export async function answerInquiry(token, inquiryId, data) {
  return await fetch(`${BASE_URL}/api/inquiry/${inquiryId}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
}

/* ?????? ?????? ??????(?????? ??????) */
export async function fetchUser(token) {
  return await fetch(`${BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
}

/* ?????? ?????? ?????? (?????? ??????) */
export async function fetchUserUpdate(token, data) {
  return await fetch(`${BASE_URL}/api/user`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
}

/* ?????? ?????? (?????? ??????) */
export async function fetchOrder(token, data) {
  return await fetch(`${BASE_URL}/api/order/create`, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
}

/*?????? ?????? ?????? (?????? ??????) */
export async function fetchUserOrder(token, page, size) {
  return await fetch(
    `${BASE_URL}/api/order/user/?page=${page}&size=${size}&sort=orderId,desc`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
