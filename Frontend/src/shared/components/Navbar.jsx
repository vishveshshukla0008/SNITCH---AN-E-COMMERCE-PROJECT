import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { 
  HiMenuAlt3, 
  HiX, 
  HiOutlineShoppingBag, 
  HiOutlineUser, 
  HiOutlineSearch 
} from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "New Drops", path: "/new" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 px-4 sm:px-8 py-4 ${
        scrolled 
          ? "bg-bg/70 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="group relative flex items-center gap-2 select-none"
        >
          <span className="text-2xl font-black tracking-tighter text-text group-hover:text-primary transition-colors duration-300">
            SNITCH
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 rounded-full shadow-[0_0_10px_#f59e0b]" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                relative text-sm font-bold uppercase tracking-widest transition-all duration-300
                ${isActive ? 'text-primary' : 'text-text-muted hover:text-text'}
                group
              `}
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </NavLink>
          ))}
        </div>

        {/* Icons / Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button className="text-text-muted hover:text-text transition-colors duration-300 md:block hidden">
            <HiOutlineSearch size={22} />
          </button>
          <Link to="/login" className="text-text-muted hover:text-text transition-colors duration-300">
            <HiOutlineUser size={22} />
          </Link>
          <button className="relative group p-2">
            <HiOutlineShoppingBag size={22} className="text-text group-hover:text-primary transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text p-1 hover:bg-bg-muted rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 top-[72px] bg-bg/95 backdrop-blur-3xl md:hidden transition-all duration-500 ease-in-out z-[-1] ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black tracking-tighter text-text hover:text-primary transition-all duration-300"
              style={{ 
                transitionDelay: `${i * 100}ms`,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0
              }}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="w-full h-1 bg-border/50 max-w-xs" />
          <button className="flex items-center gap-3 text-text-muted font-bold py-2">
            <HiOutlineSearch size={24} />
            Search Catalog
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;