import React from "react";
import "./ProductCard.css";

function ProductCard({ product, onView }) {
  const primaryImage =
    product?.images?.[0] ||
    "https://placehold.co/300x360/1a1a2e/ffffff?text=No+Image";

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const stockStatus =
    product?.stock > 10
      ? { label: "In Stock", cls: "badge--green" }
      : product?.stock > 0
      ? { label: "Low Stock", cls: "badge--orange" }
      : { label: "Out of Stock", cls: "badge--red" };

  return (
    <div className="pc-card">
      <div className="pc-img-wrap">
        <img src={primaryImage} alt={product?.name} className="pc-img" />
        <span className={`pc-badge ${stockStatus.cls}`}>{stockStatus.label}</span>
        {product?.discount > 0 && (
          <span className="pc-discount-tag">-{product.discount}%</span>
        )}
      </div>

      <div className="pc-body">
        <p className="pc-category">{product?.category || "Uncategorized"}</p>
        <h3 className="pc-name" title={product?.name}>
          {product?.name}
        </h3>

        <div className="pc-meta">
          <span className="pc-meta-item">
            <span className="pc-meta-icon">📦</span>
            {product?.stock ?? 0} units
          </span>
          <span className="pc-meta-item">
            <span className="pc-meta-icon">🏷️</span>
            {product?.sizes?.length ?? 0} sizes
          </span>
        </div>

        <div className="pc-price-row">
          <span className="pc-price">{formatPrice(product?.price)}</span>
          {product?.discount > 0 && (
            <span className="pc-original-price">
              {formatPrice(
                Math.round(product.price / (1 - product.discount / 100))
              )}
            </span>
          )}
        </div>

        <button className="pc-view-btn" onClick={() => onView(product)}>
          <span>View Product</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
