import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiChevronRight,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiShare2,
  FiInfo,
  FiCheck,
} from "react-icons/fi";
import useProduct from "../../hooks/useProduct";
import Loader from "../../../../shared/components/Loader";
import Button from "../../../../shared/components/Button";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

const PublicProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetSinglePublicProduct, handleGetAllPublicProducts } = useProduct();
  const { productLoading, allProducts } = useSelector((state) => state.product);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      // Fetch single product details
      const data = await handleGetSinglePublicProduct(id);
      if (data) {
        setProduct(data);
        const defaultVar =
          data.variants.find((v) => v.isDefault) || data.variants[0];
        setSelectedVariant(defaultVar);
        setSelectedImage(defaultVar?.images?.[0]?.url || "");
      }
      
      // Fetch all products for suggestions if not already in store
      if (allProducts.length === 0) {
        await handleGetAllPublicProducts();
      }
    };
    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  // Suggestion logic: Filter products from the same category, excluding the current one
  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 4); // Limit to 4 suggestions
  }, [allProducts, product]);

  if (productLoading && !product) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/collections">
          <Button variant="primary">Back to Collections</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant.images?.[0]?.url || "");
  };

  const handleProductClick = (p) => {
    navigate(`/collections/${p._id}`);
  };

  // Group variants by color to show unique color options
  const colorVariants = product.variants.reduce((acc, variant) => {
    const color = variant.attributes?.color;
    if (color && !acc.find((v) => v.attributes?.color === color)) {
      acc.push(variant);
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <FiChevronRight className="shrink-0" />
          <Link
            to="/collections"
            className="hover:text-primary transition-colors">
            Collections
          </Link>
          <FiChevronRight className="shrink-0" />
          <span className="text-text-muted transition-colors">
            {product.category}
          </span>
          <FiChevronRight className="shrink-0" />
          <span className="text-text font-medium truncate">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-3/4 rounded-3xl overflow-hidden bg-bg-muted border border-border group">
              <img
                src={
                  selectedImage || "https://placehold.co/600x800?text=No+Image"
                }
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.isSale && (
                <div className="absolute top-6 left-6 bg-error text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  Sale
                </div>
              )}
              {product.isNewProduct && (
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  New Arrival
                </div>
              )}
              <button className="absolute top-6 right-6 w-12 h-12 bg-bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-text hover:text-error transition-all shadow-md active:scale-90">
                <FiHeart className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-4">
              {selectedVariant?.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img.url
                      ? "border-primary shadow-md scale-95"
                      : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
                  }`}>
                  <img
                    src={img.thumbnailUrl || img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                  {product.brand || "SNITCH"}
                </span>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <FiStar className="fill-yellow-400 text-yellow-400" />
                  <span>{product.averageRating || "4.8"}</span>
                  <span className="text-text-muted font-normal">
                    (120 Reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-text">
                  {formatPrice(selectedVariant?.price?.amount)}
                </span>
                {product.discount > 0 && (
                  <span className="text-lg text-text-muted line-through">
                    {formatPrice(
                      selectedVariant?.price?.amount /
                        (1 - product.discount / 100),
                    )}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-text-muted leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Variant Selectors */}
            <div className="space-y-8 mb-10">
              {/* Mini Variant Cards */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
                  Select Variant
                </h3>
                <div className="flex gap-4 overflow-x-auto p-2 pb-4 no-scrollbar -mx-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariantSelect(v)}
                      className="shrink-0 w-20 group transition-all">
                      <div
                        className={`relative aspect-3/4 rounded-xl mb-2 transition-all duration-300 ${
                          selectedVariant?._id === v._id
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-bg scale-105 shadow-xl z-10"
                            : "ring-1 ring-border hover:ring-primary/40"
                        }`}>
                        <img
                          src={
                            v.images?.[0]?.thumbnailUrl ||
                            v.images?.[0]?.url ||
                            "https://placehold.co/100x133?text=No+Image"
                          }
                          alt={v.attributes?.color}
                          className="w-full h-full object-cover rounded-[calc(var(--radius-xl)-2px)]"
                        />
                      </div>
                      <p
                        className={`text-[10px] font-bold text-center truncate uppercase tracking-tight transition-colors ${
                          selectedVariant?._id === v._id
                            ? "text-primary"
                            : "text-text-muted group-hover:text-text"
                        }`}>
                        {v.attributes?.color}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection (Original circles, keeping them for redundancy or can remove if mini cards are enough) */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>
                    Color:{" "}
                    <span className="text-text-muted font-normal ml-2">
                      {selectedVariant?.attributes?.color}
                    </span>
                  </span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {colorVariants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVariantSelect(v)}
                      className={`group relative p-1 rounded-full border-2 transition-all ${
                        selectedVariant?.attributes?.color ===
                        v.attributes?.color
                          ? "border-primary shadow-sm"
                          : "border-transparent hover:border-border"
                      }`}>
                      <div
                        className="w-10 h-10 rounded-full border border-black/5 shadow-inner"
                        style={{
                          backgroundColor: v.attributes?.color?.toLowerCase(),
                        }}
                      />
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {v.attributes?.color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

           
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Select Size
                  </h3>
                  <button className="text-xs font-bold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="min-w-[56px] h-12 flex items-center justify-center rounded-xl border border-border text-sm font-bold transition-all hover:border-primary hover:text-primary active:scale-95 disabled:opacity-30 disabled:pointer-events-none">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-bg-muted rounded-xl p-1 border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-bg-surface rounded-lg transition-colors">
                    -
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-bg-surface rounded-lg transition-colors">
                    +
                  </button>
                </div>
                <div className="flex-1">
                  <Button
                    variant="primary"
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                    leftIcon={<FiShoppingBag className="w-5 h-5" />}>
                    Add to Cart
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl text-lg font-bold">
                Buy it Now
              </Button>
            </div>

            {/* Product Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiTruck />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Free Shipping</h4>
                  <p className="text-xs text-text-muted">On orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiRotateCcw />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Easy Returns</h4>
                  <p className="text-xs text-text-muted">
                    7 days return policy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiShield />
                </div>
                <div>
                  <h4 className="text-sm font-bold">100% Authentic</h4>
                  <p className="text-xs text-text-muted">Direct from SNITCH</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiInfo />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Secure Payment</h4>
                  <p className="text-xs text-text-muted">All cards accepted</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm font-medium">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <FiShare2 /> Share
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <FiHeart /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Details Tabs */}
        <div className="mt-20 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-8">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Sub Category</span>
                <span className="font-medium">{product.subCategory}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Brand</span>
                <span className="font-medium">{product.brand || "SNITCH"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Stock Status</span>
                <span
                  className={`font-medium ${selectedVariant?.stock > 0 ? "text-success" : "text-error"}`}>
                  {selectedVariant?.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Weight</span>
                <span className="font-medium">
                  {selectedVariant?.weight} kg
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Dimensions</span>
                <span className="font-medium">
                  {selectedVariant?.dimensions?.length} x{" "}
                  {selectedVariant?.dimensions?.width} x{" "}
                  {selectedVariant?.dimensions?.height} cm
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-text-muted">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-bg-muted px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        {suggestedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-boldk">Highly Suggested Items</h2>
              <Link to="/collections" className="text-sm font-bold text-primary hover:underline underline-offset-4 transition-all">
                View All Collections
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestedProducts.map((p) => (
                <ProductCard 
                  key={p._id} 
                  product={p} 
                  onView={() => handleProductClick(p)} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProductDetails;
