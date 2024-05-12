import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "@/screens/Home.tsx";

const RouteApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteApp;