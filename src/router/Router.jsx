import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Search from "../components/Search";
// import Pages
import Home from "../pages/Home";
import Join from "../pages/Join";
import Login from "../pages/Login";
import NewArrivalsMens from "../pages/mens/NewArrivalsMens";
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
      </Routes>
    </Routers>
  );
}

export default Router;
