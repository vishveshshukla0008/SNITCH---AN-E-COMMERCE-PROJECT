import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../features/Authentication/pages/Login";
import Signup from "../features/Authentication/pages/Signup";
import VerifyEmailNotice from "../features/Authentication/pages/VerifyEmailNotice";
import VerifyEmailSuccess from "../features/Authentication/pages/VerifyEmailSuccess";
import Home from "../pages/Home";
import CreateProductPage from "../features/products/pages/CreateProductPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-email-notice" element={<VerifyEmailNotice />} />
          <Route path="verify/:token" element={<VerifyEmailSuccess />} />
          {/* <Route path="seller" element={<SellerLayout />}> */}
          {/* <Route index element={<Dashboard />} /> */}
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="products/create" element={<CreateProductPage />} />
          {/* <Route path="products/:id" element={<EditProduct />} /> */}
          {/* <Route path="orders" element={<Orders />} /> */}
          {/* <Route path="users" element={<Users />} /> */}
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
