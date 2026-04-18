import React from "react";

const FallingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      <div className="stars-container absolute inset-0">
        {/* Twinkling Stars */}
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          return (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full opacity-20"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 4 + 3}s infinite ${Math.random() * 5}s alternate`,
                boxShadow: size > 2 ? '0 0 5px rgba(255,255,255,0.5)' : 'none',
              }}
            />
          );
        })}

        {/* Falling Meteors */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute bg-linear-to-r from-primary via-primary/50 to-transparent"
            style={{
              width: `${Math.random() * 100 + 100}px`,
              height: "2px",
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              transform: "rotate(-35deg)",
              filter: "blur(0.5px)",
              opacity: 0,
              animation: `fall ${Math.random() * 8 + 6}s linear infinite ${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
          100% { opacity: 0.1; transform: scale(0.8); }
        }
        @keyframes fall {
          0% { transform: translate(500px, -500px) rotate(-35deg); opacity: 0; }
          10% { opacity: 0.8; }
          20% { transform: translate(-1000px, 1000px) rotate(-35deg); opacity: 0; }
          100% { transform: translate(-1000px, 1000px) rotate(-35deg); opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
};

export default FallingStars;
