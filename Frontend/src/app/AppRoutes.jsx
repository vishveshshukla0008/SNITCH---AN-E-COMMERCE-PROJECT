import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";

import Login from "../features/Authentication/pages/Login";
import Signup from "../features/Authentication/pages/Signup";
import VerifyEmailNotice from "../features/Authentication/pages/VerifyEmailNotice";
import VerifyEmailSuccess from "../features/Authentication/pages/VerifyEmailSuccess";
import { Protect } from "../features/Authentication/components/Protect";

import CreateProductPage from "../features/products/pages/CreateProductPage";
import Dashboard from "../features/products/pages/Dashboard";
import ProductDetails from "../features/products/pages/ProductDetails";

const sellerRoutes = [
  {
    path: "products/create",
    element: <CreateProductPage />,
  },
  {
    path: "products/dashboard",
    element: <Dashboard />,
  },
  {
    path: "products/:id",
    element: <ProductDetails />,
  },
];

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

          {sellerRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<Protect role="seller">{element}</Protect>}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
