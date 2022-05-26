export async function fetchNewArriavlsMens() {
  return await (
    await fetch("https://shoppingmall-app.herokuapp.com/api/item/list?keyword=")
  ).json();
}
