import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { FiSearch, FiFilter, FiX, FiChevronDown, FiGrid, FiList } from "react-icons/fi";
import useProduct from "../../hooks/useProduct";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router";

const Products = () => {
  const { handleGetAllPublicProducts } = useProduct();
  const { allProducts, productLoading } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    handleGetAllPublicProducts();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = allProducts.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [allProducts]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(lowerSearch);
        const tagMatch = p.tags?.some((tag) => tag.toLowerCase().includes(lowerSearch));
        const categoryMatch = p.category?.toLowerCase().includes(lowerSearch);
        const subCategoryMatch = p.subCategory?.toLowerCase().includes(lowerSearch);
        return titleMatch || tagMatch || categoryMatch || subCategoryMatch;
      });
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price?.amount - b.price?.amount);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price?.amount - a.price?.amount);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [allProducts, searchTerm, selectedCategory, sortBy]);

  const handleProductClick = (product) => {
    navigate(`/collections/${product._id}`);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Hero Section / Search Bar Area */}
      <div className="relative pb-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto text-center space-y-3 pt-7">
          <h1 className="text-4xl text-text md:text-5xl font-bold tracking-tight">
            Explore Our Collection
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto mb-8">
            Discover premium apparel designed for style, comfort, and durability.
          </p>

          {/* Search Bar Container */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by name, tag, category..."
              className="block w-full pl-12 pr-4 py-4 bg-bg-surface border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none shadow-sm hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Controls Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sticky top-20 z-10 bg-bg/80 backdrop-blur-md py-4 border-b border-border/50">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-bg-surface border border-border hover:border-primary/50 text-text-muted hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="text-md text-text-muted">
              Showing <span className="font-semibold text-text">{filteredProducts.length}</span> products
            </div>
            
            <div className="relative flex items-center gap-2">
              <span className="text-md text-text-muted hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-bg-surface border-none  rounded-xl px-3 py-2 text-md font-medium  outline-none cursor-pointer hover:border-primary/50 transition-all appearance-none pr-8"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {productLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-bg-muted rounded-2xl aspect-[3/4] mb-4"></div>
                <div className="h-4 bg-bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onView={handleProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-bg-muted p-6 rounded-full mb-6">
              <FiSearch className="w-12 h-12 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-text-muted mb-8">
              We couldn't find any products matching your search. Try different keywords or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;