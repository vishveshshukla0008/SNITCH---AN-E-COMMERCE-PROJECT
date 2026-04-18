import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import AvatarDropdown from "./AvatarDropdown";
import { useAuth } from "../../features/Authentication/hook/useAuth";
import { useTheme } from "../../features/Theme/hook/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const { logoutHandler } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logoutHandler();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "New Drops", path: "/new" },
    { name: "About", path: "/about" },
  ];

  const sellerLinks = [
    { name: "Sell New Product", path: "/products/create" },
    { name: "Dashboard", path: "/products/dashboard" },
    { name: "Orders", path: "/orders" },
    { name: "Profile", path: "/profile" },
    { name: "About", path: "/about" },
  ];

  const navLinks = user?.role === "seller" ? sellerLinks : userLinks;
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 px-4 sm:px-8 py-4 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-xl border-b border-border/10 py-3 shadow-2xl"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="group relative flex items-center gap-2 select-none shrink-0">
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-text group-hover:text-primary transition-colors duration-300">
            SNITCH
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 rounded-full" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden w-full md:flex items-center gap-8 justify-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                relative text-md font-sans uppercase tracking-1 font-black transition-all duration-300
                ${isActive ? "text-primary" : "text-text-muted hover:text-text"}
                group
              `}>
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </NavLink>
          ))}
        </div>

        {/* Icons / Actions */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Desktop Search */}
          <button className="text-text-muted hover:text-text transition-colors duration-300 hidden md:flex p-2 rounded-xl hover:bg-bg-muted">
            <HiOutlineSearch size={20} />
          </button>

          <button className="relative group p-2 rounded-xl hover:bg-bg-muted transition-colors">
            <HiOutlineShoppingBag
              size={20}
              className="text-text group-hover:text-primary transition-colors"
            />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-bg-muted text-text-muted hover:text-text transition-all duration-300 group">
            {theme === "light" ? (
              <HiOutlineMoon
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
            ) : (
              <HiOutlineSun
                size={20}
                className="group-hover:rotate-90 transition-transform"
              />
            )}
          </button>

          <div className="h-6 w-px bg-border/40 mx-1 hidden sm:block" />

          {user ? (
            <AvatarDropdown user={user} onLogout={handleLogout} />
          ) : authLoading ? (
            <div className="w-10 h-10 rounded-full bg-bg-muted animate-pulse" />
          ) : (
            <Link
              to="/login"
              className="group flex items-center gap-2 p-2 rounded-xl text-text-muted hover:text-text hover:bg-bg-muted transition-all duration-300">
              <HiOutlineUser size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">
                Login
              </span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text p-2 hover:bg-bg-muted rounded-xl transition-all duration-300 transform active:scale-95"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Premium Side Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1] transition-opacity duration-500 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer Body */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-bg/90 backdrop-blur-3xl md:hidden transition-transform duration-500 ease-in-out z-[-1] border-l border-border/20 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full pt-28 pb-10 px-8">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold text-primary uppercase opacity-60">
              Navigation
            </span>
            {navLinks.map((link, i) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  text-lg font-black tracking-tighter uppercase transition-all duration-500
                  ${isActive ? "text-primary translate-x-3" : "text-text hover:text-primary"}
                `}
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-8">
            <div className="w-full h-px bg-border/20" />

            <button className="flex items-center gap-4 text-text-muted hover:text-text transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <HiOutlineSearch size={20} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                Search Catalog
              </span>
            </button>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.5em] opacity-60">
                Connect
              </span>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all cursor-pointer">
                  IG
                </div>
                <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all cursor-pointer">
                  TW
                </div>
                <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all cursor-pointer">
                  FB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
