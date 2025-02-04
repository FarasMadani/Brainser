import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainapp from "./Components/App/Mainapp";
import Landingpage from "./Components/Home/Landingpage";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="Home" element={<Mainapp />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App;