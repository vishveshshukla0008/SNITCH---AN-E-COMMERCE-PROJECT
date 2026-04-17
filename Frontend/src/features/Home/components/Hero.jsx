import React from "react";
import Button from "../../../shared/components/Button";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden font-sans bg-bg">
      {/* Editorial Split Layout */}
      <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
        {/* Text Side (Mobile Background) */}
        <div className="w-full lg:w-1/2 h-full bg-bg flex items-center px-4 sm:px-12 lg:px-24 pt-24 lg:pt-0">
          {/* Decorative abstract shape */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src="/images/luxury-hero.png"
            alt="High-End Collection"
            className="h-full w-full object-cover lg:object-center grayscale-20 hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-r from-bg via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent lg:hidden" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="max-w-2xl flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-0.5 w-12 bg-primary" />
              <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs">
                EDITORIAL 2026
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-bold tracking-tighter text-text leading-[0.85] uppercase">
              SILENT <br />
              <span className="text-primary font-extrabold">LUXURY</span>
            </h1>

            <p className="text-text-muted text-base md:text-lg font-medium max-w-md mt-4 leading-relaxed tracking-tight">
              A curated collection of minimalist essentials. Designed for those
              who speak through subtleness and demand uncompromising quality.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="md"
              className="rounded-xl px-16 py-6 text-sm uppercase -tracking-tighter shadow-none  hover:bg-primary transition-all duration-500">
              EXPLORE COLLECTION
            </Button>
            <Button
              variant="outline"
              size="md"
              className="rounded-xl px-16 py-6 text-sm uppercase tracking-widest border-2 border-text/10 hover:border-primary hover:bg-primary hover:text-white transition-all duration-500">
              LOOKBOOK
            </Button>
          </div>

          <div className="flex items-center gap-16 pt-12 border-t border-border mt-6">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] opacity-60 italic">
                Established
              </p>
              <p className="text-xl font-black text-text font-serif tracking-widest leading-none">
                MMXXVI
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] opacity-60 italic">
                Origin
              </p>
              <p className="text-xl font-black text-text font-serif tracking-widest leading-none">
                LONDON
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Floating Typography */}
      <div className="absolute bottom-10 left-10 text-[12vw] font-serif italic text-text/3 select-none pointer-events-none leading-none">
        High Performance
      </div>
    </section>
  );
};

export default Hero;
