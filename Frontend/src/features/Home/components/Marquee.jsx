import React from "react";

const Marquee = () => {
  const promises = [
    { title: "PREMIUM QUALITY", desc: "Italian Sourced Fabrics" },
    { title: "EXPRESS WORLDWIDE", desc: "Delivery in 2-4 Days" },
    { title: "ETHICAL SOURCING", desc: "Fair Trade Guaranteed" },
    { title: "EASY RETURNS", desc: "30-Day Money Back" },
  ];

  return (
    <section className="bg-bg-surface border-y border-border py-12 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex shrink-0 items-center justify-around gap-20 px-10">
            {promises.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[200px]">
                <span className="text-xs font-black text-text uppercase tracking-[0.4em]">{item.title}</span>
                <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.2em]">{item.desc}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
