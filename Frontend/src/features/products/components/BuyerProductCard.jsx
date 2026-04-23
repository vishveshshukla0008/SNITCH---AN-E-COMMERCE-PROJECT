import React, { useState } from "react";
import { HiOutlineHeart, HiHeart, HiOutlineEye, HiOutlineShoppingBag } from "react-icons/hi2";
import useCart from "../../cart/hooks/useCart";
import { toast } from "react-hot-toast";

const BuyerProductCard = ({ product, onClick }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { handleAddToCart } = useCart();
  
  // Try to find the first image available
  const primaryImage = product?.variants?.[0]?.images?.[0]?.thumbnailUrl || 
                       product?.variants?.[0]?.images?.[0]?.url ||
                       "https://placehold.co/600x800/f1f5f9/0f172a?text=SNITCH";

  const brand = product?.brand || "SNITCH";
  const title = product?.title || "Premium Apparel";
  
  // Pricing logic
  const price = product?.variants?.[0]?.price?.amount || 0;
  const discountPrice = product?.variants?.[0]?.price?.discountPrice;
  const hasDiscount = discountPrice && discountPrice < price;
  
  const discountPercentage = hasDiscount 
    ? Math.round(((price - discountPrice) / price) * 100) 
    : 0;

  return (
    <div 
      className="group relative bg-bg-surface flex flex-col  border border-transparent hover:border-border/10 transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Image Section */}
      <div className="relative aspect-3/4 overflow-hidden bg-bg-muted rounded-xl transition-all duration-700 group-hover:rounded-xl group-hover:shadow-2xl group-hover:shadow-black/5">
        <img
          src={primaryImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-5 right-5 z-10 p-3 bg-white/80 backdrop-blur-xl rounded-full text-black hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-white/20"
        >
          {isWishlisted ? (
            <HiHeart className="w-5 h-5 text-primary" />
          ) : (
            <HiOutlineHeart className="w-5 h-5" />
          )}
        </button>

        {/* Badges */}
        <div className="absolute bottom-5 hover:hidden left-5 flex flex-col gap-2 pointer-events-none">
          {product?.isNewProduct && (
            <div className="px-3 py-1 bg-primary text-white text-xs uppercase rounded-full shadow-lg shadow-primary/20">
              New Arrival
            </div>
          )}
          {hasDiscount && (
            <div className="px-3 py-1 bg-bg text-text text-xs uppercase tracking-widest rounded-full shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const variant = product.variants?.[0];
              const sizeObj = variant?.sizes?.find(s => s.stockOfSize > 0) || variant?.sizes?.[0];
              
              if (!variant || !sizeObj) {
                toast.error("Product currently unavailable");
                return;
              }

              handleAddToCart({
                productId: product._id,
                variantId: variant._id,
                size: sizeObj.size,
                quantity: 1,
              });
            }}
            className="w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hover:text-white flex items-center justify-center gap-2 active:scale-95"
          >
            <HiOutlineShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
          <button className="w-full py-4 bg-black/80 backdrop-blur-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 hover:bg-black flex items-center justify-center gap-2 active:scale-95">
            <HiOutlineEye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-6 px-3 space-y-2">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-text-muted/60 uppercase tracking-[0.25em]">
            {brand}
          </p>
          <h3 className="text-base font-bold text-text line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3 pt-1">
          {hasDiscount ? (
            <>
              <span className="text-lg font-black text-text">
                ₹{discountPrice.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-text-muted line-through opacity-40">
                ₹{price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-black text-text">
              ₹{price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerProductCard;
