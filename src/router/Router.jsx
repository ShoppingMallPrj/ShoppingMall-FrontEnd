import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Search from "../pages/Search";
// import Pages
import Home from "../pages/Home";
import Join from "../pages/Join";
import Login from "../pages/Login";
import AccMens from "../pages/mens/AccMens";
import BottomMens from "../pages/mens/BottomMens";
import NewArrivalsMens from "../pages/mens/NewArrivalsMens";
import OuterMens from "../pages/mens/OuterMens";
import ShoesMens from "../pages/mens/ShoesMens";
import TopMens from "../pages/mens/TopMens";
import AccWomens from "../pages/womens/AccWomens";
import BottomWomens from "../pages/womens/BottomWomens";
import NewArrivalsWomens from "../pages/womens/NewArrivalsWomens";
import OuterWomens from "../pages/womens/OuterWomens";
import ShoesWomens from "../pages/womens/ShoesWomens";
import TopWomens from "../pages/womens/TopWomens";
import ItemUpload from "../pages/ItemUpload";
import Order from "../pages/Order";
import Inquiry from "../pages/inquiry/Inquiry";
import InquiryDetail from "../pages/inquiry/InquiryDetail";
import InquiryCreate from "../pages/inquiry/InquiryCreate";
// import Components

function Router() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/mens/new-arrivals" element={<NewArrivalsMens />} />
        <Route path="/mens/outer" element={<OuterMens />} />
        <Route path="/mens/top" element={<TopMens />} />
        <Route path="/mens/bottom" element={<BottomMens />} />
        <Route path="/mens/shoes" element={<ShoesMens />} />
        <Route path="/mens/acc" element={<AccMens />} />
        <Route path="/womens/new-arrivals" element={<NewArrivalsWomens />} />
        <Route path="/womens/outer" element={<OuterWomens />} />
        <Route path="/womens/top" element={<TopWomens />} />
        <Route path="/womens/bottom" element={<BottomWomens />} />
        <Route path="/womens/shoes" element={<ShoesWomens />} />
        <Route path="/womens/acc" element={<AccWomens />} />
        <Route path="/item/upload" element={<ItemUpload />} />
        <Route path="/order" element={<Order />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/inquiry/:inquiryId" element={<InquiryDetail />} />
        <Route path="/inquiry/create" element={<InquiryCreate />} />
      </Routes>
    </Routers>
  );
}

export default Router;
