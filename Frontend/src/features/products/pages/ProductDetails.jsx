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

  const [formData, setFormData] = useState({});
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
        priceAmount: product.price?.amount || 0,
        priceDiscount: product.price?.discountPrice || 0,
        tags: product.tags?.join(", ") || [],
        isFeatured: product.isFeatured || false,
        isNewProduct: product.isNewProduct || false,
        isSale: product.isSale || false,
      });
    }
  }, [product]);

  function resetForm() {
    setFormData({
      title: product.title || "",
      brand: product.brand || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      description: product.description || "",
      priceAmount: product.price?.amount || 0,
      priceDiscount: product.price?.discountPrice || 0,
      tags: product.tags?.join(", ") || "",
      isFeatured: product.isFeatured || false,
      isNewProduct: product.isNewProduct || false,
      isSale: product.isSale || false,
    });
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChangesClick = () => {
    setIsModalOpen(true);
  };

  const handleVerifyAndSubmit = (password) => {
    // UI Only: Simulated save logic
    console.log("Saving changes with verification...", { formData, password });
    setIsModalOpen(false);
    alert("Changes Verified and Submitted successfully (UI Mock)!");
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
          <Button size="md:lg sm" onClick={resetForm} leftIcon={<BiReset />}>
            Reset
          </Button>
          <Button
            size="md:lg sm"
            onClick={handleSaveChangesClick}
            leftIcon={<FiSave />}>
            Make Changes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>

            <Input
              label="Product Title"
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Brand"
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
                value={formData.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
              />
              <Input
                label="Sub Category"
                value={formData.subCategory || ""}
                onChange={(e) => handleChange("subCategory", e.target.value)}
              />
            </div>

            <Textarea
              label="Description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* System Metadata Readonly Panel */}
          <div className="bg-bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiInfo className="text-text-muted" /> Product Metadata
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 opacity-70 cursor-not-allowed">
              <Input
                label="Average Rating"
                type="number"
                value={product?.averageRating || 0}
                readOnly
                disabled
              />
              <Input
                label="Created By (User ID)"
                value={product?.createdBy || "N/A"}
                readOnly
                disabled
              />
              <Input
                label="Created At"
                value={formatDate(product?.createdAt)}
                readOnly
                disabled
              />
              <Input
                label="Last Updated At"
                value={formatDate(product?.updatedAt)}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Images Preview Frame */}
          <div className="bg-bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiImage className="text-text-muted" /> Product Images (
              {product?.images?.length || 0})
            </h2>
            {product?.images?.length > 0 ? (
              <div className="space-y-3">
                {/* Featured/First Image */}
                <div className="aspect-4/5 w-full bg-bg-muted rounded-2xl border border-border overflow-hidden relative group">
                  <img
                    src={
                      product.images[0]?.thumbnailUrl ||
                      product.images[0]?.url ||
                      "https://placehold.co/600?text=Image"
                    }
                    alt="Main Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-bg/90 backdrop-blur-sm text-text px-3 py-1.5 text-xs font-bold rounded-lg border border-border shadow-sm">
                    Primary Image
                  </div>
                </div>

                {/* Additional Images Grid */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {product.images.slice(1).map((img, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-bg-muted rounded-xl border border-border overflow-hidden group">
                        <img
                          src={img?.thumbnailUrl || img?.url}
                          alt={`Product sample ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-bg-muted border border-border border-dashed rounded-2xl flex items-center justify-center">
                <p className="text-sm text-text-muted">No images configured.</p>
              </div>
            )}

            <div className="mt-4">
              <Button variant="outline" fullWidth leftIcon={<FiImage />}>
                Manage Images
              </Button>
            </div>
          </div>

          {/* Pricing Config */}
          <div className="bg-bg-surface border border-border rounded-xl p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold">
              Pricing ({product?.price?.currency || "INR"})
            </h2>
            <Input
              label="Regular Price"
              type="number"
              value={formData.priceAmount || 0}
              onChange={(e) =>
                handleChange("priceAmount", Number(e.target.value))
              }
            />
            <Input
              label="Discount Price"
              type="number"
              value={formData.priceDiscount || 0}
              onChange={(e) =>
                handleChange("priceDiscount", Number(e.target.value))
              }
            />
          </div>

          {/* Indicators & Toggles */}
          <div className="bg-bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold mb-2">Visibility Status</h2>
            <div className="flex flex-col gap-4 pl-1">
              <Checkbox
                label="Is Featured Product"
                checked={formData.isFeatured || false}
                onChange={(e) => handleChange("isFeatured", e.target.checked)}
              />
              <Checkbox
                label="Mark as New Arrival"
                checked={formData.isNewProduct || false}
                onChange={(e) => handleChange("isNewProduct", e.target.checked)}
              />
              <Checkbox
                label="Currently On Sale"
                checked={formData.isSale || false}
                onChange={(e) => handleChange("isSale", e.target.checked)}
              />
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
