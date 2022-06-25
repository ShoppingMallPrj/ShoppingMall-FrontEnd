const BASE_URL = "https://shoppingmall-app.herokuapp.com";

export async function fetchSearchItemList(keyword) {
  return await (
    await fetch(`${BASE_URL}/api/item/list?keyword=${keyword}`)
  ).json();
}
export async function fetchNewArriavlsMens() {
  return await (await fetch(`${BASE_URL}/api/item/list?keyword=`)).json();
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
  return await (await fetch(`${BASE_URL}/api/login/kakao?code=${code}`)).json();
}
export async function fetchUserGoogleLogin(tokenId) {
  return await (
    await fetch(`${BASE_URL}/api/login/google?tokenId=${tokenId}`)
  ).json();
}
// fetch Test Data
export async function fetchGetTestData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const json = await response.json();
  return json;
}
export async function fetchCreateTestData(data) {
  return await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

//form dat를 받아와 아이템을 등록한다.
export async function fetchCreateItem(data) {
  return await (
    await fetch(`${BASE_URL}/api/item/create`, {
      method: "POST",
      body: data,
    })
  );
}

/* 문의사항 데이터 리스트 요청 */
export async function fetchInquiry({page, size}) {
  return await ( await fetch(
    `${BASE_URL}/api/inquiry/list?page=${page}&size=${size}&sort=inquiryId,desc`,
    {
      method: "GET",
    }
  )).json();
}

/* 문의사항 게시물 1개 요청 */
export async function fetchInquiryDetail(inquiryId) {
  return await (
    await fetch(
      `${BASE_URL}/api/inquiry/${inquiryId}`,
      {
        method: "GET",
      }
    )
  ).json();  
}

/* 문의사항 생성 */
export async function createInquiry(data) {
  return await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}