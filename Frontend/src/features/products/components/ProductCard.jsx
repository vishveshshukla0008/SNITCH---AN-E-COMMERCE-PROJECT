import React from "react";
import { FiBox, FiTag, FiEye } from "react-icons/fi";

function ProductCard({ product, onView }) {
  const primaryImage =
    product?.images?.[0]?.thumbnailUrl ||
    "https://placehold.co/300x360/1a1a2e/ffffff?text=No+Image";

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);

  // Using the project's custom variables: success, primary, error
  const stockStatus =
    product?.stock > 10
      ? {
          label: "In Stock",
          cls: "bg-success/15 text-success border-success/30",
        }
      : product?.stock > 0
        ? {
            label: "Low Stock",
            cls: "bg-primary/15 text-primary border-primary/30",
          }
        : {
            label: "Out of Stock",
            cls: "bg-error/15 text-error border-error/30",
          };

  return (
    <div className="group flex flex-col bg-bg-surface rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-bg-muted">
        <img
          src={primaryImage}
          alt={product?.title || "Product Image"}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-md ${stockStatus.cls}`}>
            {stockStatus.label}
          </span>
          {product?.discount > 0 && (
            <span className="px-2.5 py-1 bg-text backdrop-blur-md text-bg text-xs font-bold rounded-full w-max shadow-sm">
              -{product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col grow gap-3">
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
            {product?.category || "Uncategorized"}
          </p>
          <h3
            className="font-semibold text-lg text-text line-clamp-1"
            title={product?.name}>
            {product?.title || "Unnamed Product"}
          </h3>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-text-muted mt-auto pt-2">
          <div className="flex items-center gap-1.5 bg-bg-muted px-2 py-1 rounded-md">
            <FiBox className="w-4 h-4" />
            <span className="font-medium">
              {product?.stock ?? "implement stock"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-bg-muted px-2 py-1 rounded-md">
            <FiTag className="w-4 h-4" />
            <span className="font-medium">
              {product?.sizes?.length ?? 0} sizes (to implement)
            </span>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex justify-between items-center mt-1">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-text">
                {product?.price?.amount}
              </span>
              {product?.discount > 0 && (
                <span className="text-sm text-text-muted line-through">
                  {product?.price?.amount / (1 - product?.discount / 100)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onView(product)}
          className="mt-3 cursor-pointer w-fit flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 px-5 rounded-xl font-semibold transition-colors active:scale-[0.98]">
          <FiEye className="w-4 h-4" />
          <span className="w-fit">Quick View</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
