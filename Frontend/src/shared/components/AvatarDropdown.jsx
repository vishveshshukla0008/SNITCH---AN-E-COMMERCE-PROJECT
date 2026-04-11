import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { HiOutlineUser, HiOutlineLogout, HiOutlineClipboardList, HiOutlineHeart } from "react-icons/hi";

/**
 * AvatarDropdown Component
 * 
 * Displays the user's avatar and a dropdown menu with actions.
 * Extensible by adding items to the dropdownItems array.
 */
const AvatarDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownItems = [
    { label: "My Profile", icon: HiOutlineUser, path: "/profile" },
    { label: "My Orders", icon: HiOutlineClipboardList, path: "/orders" },
    { label: "Wishlist", icon: HiOutlineHeart, path: "/wishlist" },
    { label: "Logout", icon: HiOutlineLogout, onClick: onLogout, danger: true },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-all duration-300 outline-none group"
      >
        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 transition-all duration-500 shadow-xl relative ${isOpen ? 'border-primary' : 'border-white/10 group-hover:border-primary/50'}`}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullname}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentNode.classList.add('bg-primary');
              }}
            />
          ) : (
            <div className="w-full h-full bg-bg-muted flex items-center justify-center text-primary font-black text-lg">
              {user.fullname?.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Animated Glow Effect */}
          <div className={`absolute inset-0 transition-all duration-500 ${isOpen ? 'bg-primary/10' : 'bg-primary/0 group-hover:bg-primary/5'}`} />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 pt-3 w-64 transition-all duration-500 ease-out z-110 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {/* Triangle / Arrow */}
        <div className="absolute top-1.5 right-4 w-4 h-4 bg-bg/80 backdrop-blur-2xl rotate-45 border-t border-l border-white/10" />
        
        <div className="bg-bg/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-white/5 mb-2 bg-white/5 rounded-2xl">
            <p className="text-sm font-black text-text truncate uppercase tracking-tighter">
              {user.fullname}
            </p>
            <p className="text-xs text-text-muted truncate mt-0.5 opacity-70">
              {user.email}
            </p>
          </div>

          <div className="space-y-1">
            {dropdownItems.map((item, index) => {
              const baseStyles = "flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 group/item w-full text-left";
              const hoverStyles = item.danger 
                ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                : "text-text-muted hover:text-text hover:bg-white/10";
              const iconColorStyles = item.danger 
                ? "group-hover/item:text-red-400" 
                : "group-hover/item:text-primary";

              if (item.path) {
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`${baseStyles} ${hoverStyles}`}
                  >
                    <item.icon size={20} className={`${iconColorStyles} transition-colors duration-300`} />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`${baseStyles} ${hoverStyles}`}
                >
                  <item.icon size={20} className={`${iconColorStyles} transition-colors duration-300`} />
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropdown;
