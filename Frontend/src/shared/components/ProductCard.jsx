import React from "react";
import { HiOutlineShoppingBag, HiStar } from "react-icons/hi";
import Badge from "./Badge";

const ProductCard = ({ product }) => {
  const { name, price, originalPrice, image, category, rating, isNew, discount } = product;

  return (
    <div className="group relative flex flex-col gap-3">
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-bg-muted">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && <Badge variant="dark">New Arrival</Badge>}
          {discount && <Badge variant="error">-{discount}%</Badge>}
        </div>

        {/* Product Image */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <button className="w-full bg-text text-bg py-4 rounded-2xl font-black text-sm uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl">
            <HiOutlineShoppingBag size={18} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <HiStar className="text-primary" size={12} />
            <span className="text-xs font-bold text-text-muted">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-text leading-tight group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-lg font-black text-text tracking-tighter">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-sm font-bold text-text-muted line-through opacity-50">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
