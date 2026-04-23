import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import { useNavigate } from "react-router";
import { getAllPublicProducts } from "../../features/products/services/product.api";

const Search = ({ placeholder = "Search for styles, brands...", className = "" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Fetch all products once for local filtering
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllPublicProducts();
        // The API returns products in the 'data' field based on useProduct hook
        setAllProducts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch products for search:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter results as user types
  useEffect(() => {
    if (query.trim().length > 1) {
      setIsLoading(true);
      const filtered = allProducts.filter((product) =>
        product.title?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6)); // Show top 6 results
      setIsOpen(true);
      setIsLoading(false);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, allProducts]);

  const handleSelect = (productId) => {
    navigate(`/collections/${productId}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-md ${className}`}>
      {/* Search Input Container */}
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-11 pl-12 pr-10 bg-bg-muted border border-transparent focus:border-primary/30 focus:bg-bg-surface rounded-2xl text-sm font-medium transition-all outline-none shadow-sm focus:shadow-xl focus:shadow-primary/5"
        />
        <HiOutlineSearch 
          size={18} 
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${query ? "text-primary" : "text-text-muted group-focus-within:text-primary"}`}
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
          >
            <HiX size={16} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full bg-bg-surface backdrop-blur-3xl border border-border/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          {isLoading ? (
            <div className="p-8 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              <div className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-50">
                Found {results.length} results
              </div>
              {results.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSelect(product._id)}
                  className="w-full flex items-center gap-4 p-3 hover:bg-bg-muted rounded-2xl transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-bg-muted shrink-0 border border-border/10">
                    <img 
                      src={product.images?.[0]?.url || "https://placehold.co/100x100?text=Product"} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-text truncate group-hover:text-primary transition-colors leading-tight">
                      {product.title}
                    </h4>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-xs font-black text-primary">
                    View
                  </div>
                </button>
              ))}
              <div className="mt-2 p-2 border-t border-border/5">
                <button 
                  onClick={() => navigate(`/collections?search=${query}`)}
                  className="w-full py-3 text-center text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors rounded-xl hover:bg-bg-muted"
                >
                  View All Results
                </button>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="w-12 h-12 bg-bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-muted opacity-20">
                <HiOutlineSearch size={24} />
              </div>
              <p className="text-sm font-bold text-text-muted">No items found for "{query}"</p>
              <p className="text-[10px] text-text-muted mt-1 opacity-60">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
