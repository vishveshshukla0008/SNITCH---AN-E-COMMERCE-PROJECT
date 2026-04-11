import React from "react";
import ProductCard from "../../../shared/components/ProductCard";
import { HiOutlineArrowRight } from "react-icons/hi";

const featuredProducts = [
  {
    name: "Oversized 'NEON' Hoodie",
    price: 89,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    category: "Streetwear",
    rating: 4.8,
    isNew: true,
    discount: 25,
  },
  {
    name: "Urban Utility Cargo Pants",
    price: 75,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1994&auto=format&fit=crop",
    category: "Bottoms",
    rating: 4.9,
    isNew: true,
  },
  {
    name: "Snitch Signature Tee",
    price: 45,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    category: "Essentials",
    rating: 4.7,
  },
  {
    name: "Distressed Denim Jacket",
    price: 110,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1974&auto=format&fit=crop",
    category: "Outerwear",
    rating: 4.6,
    discount: 20,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-bg w-full py-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Curated for You</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-text uppercase leading-tight">Best Sellers <br /> <span className="opacity-40">Collection</span></h2>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-bg-muted border border-border text-xs font-black uppercase tracking-widest text-text hover:bg-text hover:text-bg hover:border-text transition-all duration-500 group">
            Shop Full Catalog <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <button className="md:hidden w-full mt-12 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-border text-sm font-black uppercase tracking-widest text-text hover:bg-text hover:text-bg transition-all duration-300">
          See All Products <HiOutlineArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
