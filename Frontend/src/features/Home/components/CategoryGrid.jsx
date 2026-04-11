import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

const categories = [
  {
    title: "Streetwear",
    subtitle: "New Drop • 01",
    image: "/images/streetwear.png",
    className: "col-span-1 md:col-span-2 aspect-[16/9]"
  },
  {
    title: "Accessories",
    subtitle: "Essentials • 02",
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-1 aspect-[4/5]"
  },
  {
    title: "Footwear",
    subtitle: "Handcrafted • 03",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    className: "col-span-1 aspect-[4/5]"
  },
  {
    title: "Lifestyle",
    subtitle: "Editorial • 04",
    image: "https://images.unsplash.com/photo-1523381235312-3590795c6b80?q=80&w=2070&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2 aspect-[16/9]"
  },
];

const CategoryGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-32 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
         <div className="flex flex-col gap-4">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Curation</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text uppercase leading-none">
              Shop by <br /> <span className="text-primary">Department</span>
            </h2>
         </div>
         <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-text-muted hover:text-text transition-all duration-300 pb-2 border-b-2 border-transparent hover:border-primary">
            Explore All <HiOutlineArrowRight size={20} />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`group relative overflow-hidden bg-bg-muted cursor-pointer ${cat.className || ""}`}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 p-10 w-full flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.3em]">{cat.subtitle}</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">{cat.title}</h3>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500">
                <HiOutlineArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
