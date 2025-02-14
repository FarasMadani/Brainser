import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainapp from "./Components/App/Mainapp";
import Landingpage from "./Components/Home/Landingpage";
import Signup from "./Components/Auth/Signup";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute redirectTo="/Sign">
              <Mainapp />
            </ProtectedRoute>
          }
        />
        <Route path="/Sign" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;