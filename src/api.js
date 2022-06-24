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