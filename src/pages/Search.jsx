import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchSearchItemList } from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Search() {
  const { keyword } = useParams();
  console.log(keyword);
  const { isLoading, data } = useQuery(["searchItemList", keyword], () =>
    fetchSearchItemList(keyword)
  );
  console.log(data);

  return (
    <>
      <Header />
      <main></main>
      <Footer />
    </>
  );
}

export default Search;
