import React from "react";
import { useEffect } from "react";
import useProduct from "../hooks/useProduct";
import { useSelector } from "react-redux";

function Dashboard() {
  const { handleGetAllSellerProducts } = useProduct();
  const { sellerAllProducts } = useSelector((state) => state.product);
  console.log(sellerAllProducts);
  const fetchAllSellingProducts = async () => {
    await handleGetAllSellerProducts();
  };

  useEffect(() => {
    fetchAllSellingProducts();
  }, []);

  return <div>Dashboard</div>;
}

export default Dashboard;
