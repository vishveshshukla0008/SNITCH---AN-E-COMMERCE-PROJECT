import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../features/Authentication/pages/Login";
import Signup from "../features/Authentication/pages/Signup";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
