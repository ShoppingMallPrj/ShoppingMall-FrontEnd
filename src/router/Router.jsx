import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewArrivalsMens from "../pages/mens/NewArrivalsMens";

function Router() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mens/new-arrivals" element={<NewArrivalsMens />} />
      </Routes>
    </Routers>
  );
}

export default Router;
