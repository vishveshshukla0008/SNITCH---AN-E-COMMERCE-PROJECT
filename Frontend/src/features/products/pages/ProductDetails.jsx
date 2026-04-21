import React, { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import Loader from "../../../shared/components/Loader";
import {
  FiCheck,
  FiArrowLeft,
  FiImage,
  FiShield,
  FiSave,
  FiInfo,
} from "react-icons/fi";
import { BiReset } from "react-icons/bi";

// Importing UI components from shared folder
import Input from "../../../shared/components/input";
import Textarea from "../../../shared/components/Textarea";
import Checkbox from "../../../shared/components/Checkbox";
import Button from "../../../shared/components/Button";

const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-surface border border-border rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-fade-in-up">
        <div className="w-12 h-12 bg-primary/15 text-primary rounded-full flex items-center justify-center mb-5">
          <FiShield className="text-2xl" />
        </div>
        <h3 className="text-2xl font-bold text-text mb-2">Verify Ownership</h3>
        <p className="text-sm text-text-muted mb-6">
          Please enter your seller account password to securely apply these
          changes to the catalog.
        </p>

        <Input
          label="Account Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FiCheck />}
            onClick={() => onSubmit(password)}>
            Confirm Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleGetSellersSingleProduct } = useProduct();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    subCategory: "",
    description: "",
    tags: "",
    isFeatured: false,
    isNewProduct: false,
    isSale: false,
    variants: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchProduct() {
    const data = await handleGetSellersSingleProduct(id);
    setProduct(data);
  }

  const productLoading = useSelector((state) => state.product.productLoading);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        brand: product.brand || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        description: product.description || "",
        tags: product.tags?.join(", ") || "",
        isFeatured: product.isFeatured || false,
        isNewProduct: product.isNewProduct || false,
        isSale: product.isSale || false,
        variants: product.variants || [],
      });
    }
  }, [product]);

  function resetForm() {
    if (product) {
      setFormData({
        title: product.title || "",
        brand: product.brand || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        description: product.description || "",
        tags: product.tags?.join(", ") || "",
        isFeatured: product.isFeatured || false,
        isNewProduct: product.isNewProduct || false,
        isSale: product.isSale || false,
        variants: product.variants || [],
      });
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (variantId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) => {
        if (v._id !== variantId) return v;

        if (field.includes(".")) {
          const [parent, child] = field.split(".");
          return {
            ...v,
            [parent]: {
              ...v[parent],
              [child]: value,
            },
          };
        }

        return { ...v, [field]: value };
      }),
    }));
  };

  const handleSaveChangesClick = () => {
    setIsModalOpen(true);
  };

  const handleVerifyAndSubmit = (password) => {
    // UI Only: Logging the updated data as requested
    console.log("Saving changes with verification...", {
      updatedProduct: {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
      },
      verificationPassword: password,
    });
    setIsModalOpen(false);
    alert(
      "Changes logged to console successfully! Check your browser console to see the updated data structure.",
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [selectedImages, setSelectedImages] = useState({});

  function handleImageClick(variantId, url) {
    setSelectedImages((prev) => ({ ...prev, [variantId]: url }));
  }

  if (productLoading) return <Loader />;

  if (!product && !productLoading) {
    return (
      <div className="min-h-screen bg-bg text-text p-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          onClick={() => navigate("/products/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text pb-20">
      {/* Header bar */}
      <div className="sticky top-0 z-40 bg-bg-surface/80 backdrop-blur-md border-b border-border px-6 md:px-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/products/dashboard")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-bg-muted hover:bg-border text-text transition-colors"
            title="Go Back">
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold line-clamp-1">
              {product?.title || "Edit Product"}
            </h1>
            <p className="text-xs text-text-muted">
              Product ID: {product?._id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="md"
            variant="outline"
            onClick={resetForm}
            leftIcon={<BiReset />}>
            Reset
          </Button>
          <Button
            size="md"
            variant="primary"
            onClick={handleSaveChangesClick}
            leftIcon={<FiSave />}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Basic Information Panel */}
          <div className="bg-bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiInfo className="text-primary" /> Basic Information
            </h2>

            <Input
              label="Product Title"
              placeholder="e.g. Premium Cotton Shirt"
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Brand"
                placeholder="Generic"
                value={formData.brand || ""}
                onChange={(e) => handleChange("brand", e.target.value)}
              />
              <Input
                label="Tags (Comma separated)"
                placeholder="e.g. casual, summer, slim-fit"
                value={formData.tags || ""}
                onChange={(e) => handleChange("tags", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Main Category"
                placeholder="Men"
                value={formData.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
              />
              <Input
                label="Sub Category"
                placeholder="T-Shirts"
                value={formData.subCategory || ""}
                onChange={(e) => handleChange("subCategory", e.target.value)}
              />
            </div>

            <Textarea
              label="Description"
              placeholder="Provide a detailed description of the product..."
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </div>

          {/* Product Variants Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-lg">
                  {formData.variants.length}
                </div>
                Product Variants
              </h2>
            </div>

            <div className="space-y-8">
              {formData.variants.map((variant, index) => (
                <div
                  key={variant._id || index}
                  className="bg-bg-surface border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Variant Header */}
                  <div className="bg-bg-muted/50 px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-border shadow-inner"
                        style={{
                          backgroundColor:
                            variant.attributes?.color?.toLowerCase() ||
                            "transparent",
                        }}
                      />
                      <div>
                        <h3 className="font-bold text-lg capitalize">
                          {variant.attributes?.color || "Unnamed Variant"}
                        </h3>
                        <p className="text-xs text-text-muted">
                          SKU: {variant._id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {variant.isDefault && (
                        <span className="bg-primary/15 text-primary text-[10px] uppercase font-bold px-2 py-1 rounded-md border border-primary/20">
                          Default
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${
                          variant.status === "Active"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}>
                        {variant.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Variant Images */}
                    <div className="md:col-span-4 space-y-4">
                      <div className="aspect-3/4 w-full bg-bg-muted rounded-xl border border-border overflow-hidden relative group">
                        <img
                          src={
                            selectedImages[variant._id] ||
                            variant.images?.[0]?.url ||
                            "https://placehold.co/600x800?text=No+Image"
                          }
                          alt="Variant"
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium backdrop-blur-[2px]">
                          <FiImage className="mr-2" /> Change Image
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {variant.images?.map((img, i) => (
                          <div
                            key={i}
                            className="aspect-square bg-bg-muted rounded-lg border border-border overflow-hidden">
                            <img
                              onClick={() =>
                                handleImageClick(variant._id, img.url)
                              }
                              src={img.thumbnailUrl || img.url}
                              className="w-full h-full object-cover cursor-pointer"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Variant Details */}
                    <div className="md:col-span-8 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          label="Regular Price (INR)"
                          type="number"
                          value={variant.price?.amount || 0}
                          onChange={(e) =>
                            handleVariantChange(
                              variant._id,
                              "price.amount",
                              Number(e.target.value),
                            )
                          }
                        />
                        <Input
                          label="Discount Price (INR)"
                          type="number"
                          value={variant.price?.discountPrice || 0}
                          onChange={(e) =>
                            handleVariantChange(
                              variant._id,
                              "price.discountPrice",
                              Number(e.target.value),
                            )
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Input
                          label="Stock Quantity"
                          type="number"
                          value={variant.stock || 0}
                          onChange={(e) =>
                            handleVariantChange(
                              variant._id,
                              "stock",
                              Number(e.target.value),
                            )
                          }
                        />
                        <Input
                          label="Weight (kg)"
                          type="number"
                          step="0.1"
                          value={variant.weight || 0}
                          onChange={(e) =>
                            handleVariantChange(
                              variant._id,
                              "weight",
                              Number(e.target.value),
                            )
                          }
                        />
                        <Input
                          label="Color Name"
                          value={variant.attributes?.color || ""}
                          onChange={(e) =>
                            handleVariantChange(
                              variant._id,
                              "attributes.color",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-bold text-text-muted mb-4">
                          Dimensions (L × W × H)
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            placeholder="Length"
                            type="number"
                            value={variant.dimensions?.length || 0}
                            onChange={(e) =>
                              handleVariantChange(
                                variant._id,
                                "dimensions.length",
                                Number(e.target.value),
                              )
                            }
                          />
                          <Input
                            placeholder="Width"
                            type="number"
                            value={variant.dimensions?.width || 0}
                            onChange={(e) =>
                              handleVariantChange(
                                variant._id,
                                "dimensions.width",
                                Number(e.target.value),
                              )
                            }
                          />
                          <Input
                            placeholder="Height"
                            type="number"
                            value={variant.dimensions?.height || 0}
                            onChange={(e) =>
                              handleVariantChange(
                                variant._id,
                                "dimensions.height",
                                Number(e.target.value),
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Visibility Status Card */}
          <div className="bg-bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Visibility Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-bg-muted/30 rounded-xl border border-border/50">
                <Checkbox
                  label="Featured Product"
                  description="Promote this product on the home page."
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange("isFeatured", e.target.checked)}
                />
              </div>
              <div className="p-4 bg-bg-muted/30 rounded-xl border border-border/50">
                <Checkbox
                  label="New Arrival"
                  description="Mark as a new collection item."
                  checked={formData.isNewProduct}
                  onChange={(e) =>
                    handleChange("isNewProduct", e.target.checked)
                  }
                />
              </div>
              <div className="p-4 bg-bg-muted/30 rounded-xl border border-border/50">
                <Checkbox
                  label="Flash Sale"
                  description="Apply special sale badges."
                  checked={formData.isSale}
                  onChange={(e) => handleChange("isSale", e.target.checked)}
                />
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiShield className="text-text-muted" /> Audit Log
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-text-muted mb-1">
                  Average Rating
                </p>
                <div className="flex items-center gap-2 text-lg font-bold">
                  {product?.averageRating || "0.0"}
                  <div className="text-yellow-500 text-sm flex">
                    {"★".repeat(Math.round(product?.averageRating || 0))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-muted mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm">{formatDate(product?.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-muted mb-1">
                    Created At
                  </p>
                  <p className="text-sm">{formatDate(product?.createdAt)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-muted mb-1">
                    Seller ID
                  </p>
                  <p className="text-xs font-mono bg-bg-muted p-1.5 rounded">
                    {product?.createdBy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleVerifyAndSubmit}
      />
    </div>
  );
};

export default ProductDetails;
