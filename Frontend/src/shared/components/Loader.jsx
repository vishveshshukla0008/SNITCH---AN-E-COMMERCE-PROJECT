import React from "react";

const Loader = ({ fullPage = true }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-8 relative">
      {/* Background Ambient Glows */}
      <div className="absolute -top-10 -left-10 w-40 h-40  rounded-full blur-[80px] animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] animate-pulse delay-700" />

      <div className="relative group">
        {/* Animated Outer Ring (Stitching effect) */}
        <div className="absolute -inset-6 border border-dashed border-primary/30 rounded-full animate-spin-slow opacity-40" />

        {/* Main Hanger SVG */}
        <div className="animate-float relative z-10">
          <svg
            width="100"
            height="70"
            viewBox="0 0 60 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb,245,158,11),0.4)]"
          >
            {/* The Hook */}
            <path
              d="M30 4C31.5 4 33 5.5 33 7.5C33 9.5 31.5 11 30 11H28"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-draw-hook"
            />
            {/* The Main Frame */}
            <path
              d="M30 11V15M30 15C18 15 8 28 8 28H52C52 28 42 15 30 15Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.08"
              className="animate-draw-frame"
            />
          </svg>
        </div>

        {/* Pulsing Shadow */}
        <div className="mt-4 h-1.5 w-16 bg-black/20 rounded-full blur-md mx-auto animate-pulse scale-x-125" />
      </div>

      <div className="flex flex-col items-center space-y-3 z-10">
        <h2 className="text-3xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-text via-primary to-text bg-[length:200%_auto] animate-gradient-text text-center">
          SNITCH
        </h2>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted font-black">
            Curating Excellence
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-text {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes draw-hook {
          0% { stroke-dasharray: 20; stroke-dashoffset: 20; opacity: 0; }
          100% { stroke-dasharray: 20; stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes draw-frame {
          0% { stroke-dasharray: 120; stroke-dashoffset: 120; opacity: 0; }
          100% { stroke-dasharray: 120; stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-gradient-text { animation: gradient-text 4s linear infinite; }
        .animate-draw-hook { animation: draw-hook 1.5s ease-out forwards; }
        .animate-draw-frame { animation: draw-frame 2s ease-out 0.3s forwards; }
      `,
        }}
      />
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg/70 backdrop-blur-xl transition-all duration-500 overflow-hidden">
        {/* Subtle texture background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="p-16 rounded-[48px] bg-bg-surface/30 border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] backdrop-blur-2xl relative overflow-hidden group scale-90 sm:scale-100 transition-transform">
          {/* Inner Glow/Shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
