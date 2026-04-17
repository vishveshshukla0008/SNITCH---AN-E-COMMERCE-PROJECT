import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useProduct from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { FiPackage, FiTrendingUp, FiActivity } from "react-icons/fi";

const ProductSkeleton = () => (
  <div className="flex flex-col bg-bg-surface rounded-2xl overflow-hidden border border-border animate-pulse">
    <div className="aspect-4/5 bg-bg-muted" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-bg-muted rounded w-1/3" />
      <div className="h-6 bg-bg-muted rounded w-3/4" />
      <div className="flex gap-4 mt-auto pt-2">
        <div className="h-6 w-16 bg-bg-muted rounded" />
        <div className="h-6 w-16 bg-bg-muted rounded" />
      </div>
      <div className="h-8 bg-bg-muted rounded w-1/2 mt-1" />
      <div className="h-10 bg-bg-muted rounded w-full mt-3" />
    </div>
  </div>
);

function Dashboard() {
  const { handleGetAllSellerProducts } = useProduct();
  const product = useSelector((state) => state.product);
  const { sellerAllProducts, productLoading } = product;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllSellingProducts = async () => {
      await handleGetAllSellerProducts();
    };
    fetchAllSellingProducts();
  }, []);

  const handleViewProduct = (product) => {
    let ans = confirm(
      `View Product Action Triggered for ${product?.title || "Product"}`,
    );
    if (ans) navigate(`/products/${product?._id}`);
  };

  const products = Array.isArray(sellerAllProducts) ? sellerAllProducts : [];
  const inStockCount = products.filter((p) => p.stock > 0).length;
  const outOfStockCount = products.filter(
    (p) => !p.stock || p.stock <= 0,
  ).length;

  return (
    <div className="min-h-screen bg-bg text-text p-6 md:p-10 lg:p-12">
      <div className="mb-10 space-y-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            Seller Dashboard
          </h1>
          <p className="text-text-muted text-sm md:text-lg">
            Manage your inventory, monitor fast-moving products, and track
            out-of-stock items (All-In-One Place).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-surface p-6 rounded-lg border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">
                Total Products
              </p>
              <h3 className="text-3xl font-bold mt-1">{products.length}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/15 text-primary rounded-full flex items-center justify-center text-xl">
              <FiPackage />
            </div>
          </div>
          <div className="bg-bg-surface p-6 rounded-lg border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">In Stock</p>
              <h3 className="text-3xl font-bold mt-1">{inStockCount}</h3>
            </div>
            <div className="w-12 h-12 bg-success/15 text-success rounded-full flex items-center justify-center text-xl">
              <FiTrendingUp />
            </div>
          </div>
          <div className="bg-bg-surface p-6 rounded-lg border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">
                Needs Restock
              </p>
              <h3 className="text-3xl font-bold mt-1">{outOfStockCount}</h3>
            </div>
            <div className="w-12 h-12 bg-error/15 text-error rounded-full flex items-center justify-center text-xl">
              <FiActivity />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Catalog</h2>
        </div>

        {productLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {sellerAllProducts?.map((product) => (
              <ProductCard
                key={product?._id}
                product={product}
                onView={handleViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-bg-surface rounded-3xl border border-border border-dashed p-16 flex flex-col items-center justify-center text-center">
            <div className="bg-bg-muted w-24 h-24 rounded-full flex items-center justify-center mb-6">
              <FiPackage className="text-4xl text-text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Products Found</h3>
            <p className="text-text-muted max-w-md">
              You haven't added any products to your catalog yet. Once you add
              products, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
