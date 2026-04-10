import React from "react";

const Loader = ({ fullPage = true }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Hanger SVG Animation */}
        <div className="animate-hanger-swing origin-top">
          <svg
            width="80"
            height="50"
            viewBox="0 0 60 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
            <path
              d="M30 2C31.6569 2 33 3.34315 33 5C33 6.65685 31.6569 8 30 8H28M30 8V12M30 12C15 12 5 28 5 28H55C55 28 45 12 30 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Pulsing Shadow Below */}
        <div className="mt-2 h-1 w-12 bg-primary/20 rounded-full blur-sm mx-auto animate-pulse" />
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xl font-black tracking-tighter text-text animate-pulse">
          SNITCH
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold mt-1">
          Preparing your style
        </span>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes hanger-swing {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        .animate-hanger-swing {
          animation: hanger-swing 2s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-bg/60 backdrop-blur-md transition-all duration-300">
        <div className="p-10 rounded-3xl bg-bg-surface/50 border border-white/20 shadow-2xl">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
