import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  HiOutlineCloudArrowUp,
  HiOutlineXMark,
  HiOutlinePlus,
  HiOutlineTag,
  HiOutlineCurrencyRupee,
  HiOutlineInformationCircle,
  HiOutlineViewColumns,
  HiOutlineCalendar,
  HiOutlineStar,
} from "react-icons/hi2";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Select from "../../../shared/components/Select";
import Textarea from "../../../shared/components/Textarea";
import Checkbox from "../../../shared/components/Checkbox";
import Badge from "../../../shared/components/Badge";
import useProduct from "../hooks/useProduct";

const CreateProductPage = () => {
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { handleCreateProductHandler } = useProduct();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      brand: "Generic",
      category: "",
      subCategory: "",
      price: {
        amount: "",
        discountPrice: "",
        currency: "INR",
      },
      tags: [],
      images: [],
      isFeatured: false,
      isNewProduct: false,
      isSale: false,
      averageRating: 0,
    },
  });

  // Register internal fields that don't have a direct input element
  useEffect(() => {
    register("images", {
      validate: (val) => {
        if (!val || val.length < 5) return "Minimum 5 images required";
        if (val.length > 10) return "Maximum 10 images exceeded";
        return true;
      },
    });
  }, [register]);

  const images = watch("images");
  const isSale = watch("isSale");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (images.length + validFiles.length > 10) {
      toast.error("You can only upload up to 10 images");
      return;
    }

    const newImages = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...newImages];
    setValue("images", updatedImages);
    trigger("images");
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    URL.revokeObjectURL(updatedImages[index].url);
    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
    trigger("images");
  };

  const handleAddTag = (e, field) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!field.value.includes(tagInput.trim())) {
        field.onChange([...field.value, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // 🔹 1. Images (IMPORTANT)
    if (data.images?.length) {
      data.images.forEach((img) => {
        formData.append("images", img.file); // only file
      });
    }

    // 🔹 2. Basic Fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);

    // 🔹 3. Nested Object (price)
    formData.append("price[amount]", data.price.amount);
    formData.append("price[discountPrice]", data.price.discountPrice);
    formData.append("price[currency]", data.price.currency);

    // 🔹 4. Tags (Array)
    if (data.tags?.length) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });
    }

    // 🔹 5. Booleans (Ensuring string conversion)
    formData.append("isFeatured", String(data.isFeatured));
    formData.append("isNewProduct", String(data.isNewProduct));
    formData.append("isSale", String(data.isSale));

    // 🔹 6. Date
    if (data.saleEndDate) {
      formData.append("saleEndDate", data.saleEndDate);
    }

    // 🔹 7. Optional Rating
    if (data.averageRating) {
      formData.append("averageRating", data.averageRating);
    }

    try {
      await handleCreateProductHandler(formData);
      reset();
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-bg p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-border/50">
          <div>
            <h1 className="text-4xl font-black text-text -tracking-normal lg:tracking-wider uppercase">
              SELL PRODUCT
            </h1>
            <p className="text-text-muted text-sm font-medium mt-1">
              Configure your product details and publish to the shop.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              disabled={!isValid}
              size="md">
              Publish Product
            </Button>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Gallery Section */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <HiOutlineCloudArrowUp className="w-6 h-6 " />
                </div>
                <div>
                  <h2 className="text-xl font-black text-text uppercase tracking-tight">
                    Product Gallery
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Upload between 5 and 10 high-quality images.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 group ${
                    errors.images
                      ? "border-error bg-error/5"
                      : "border-border bg-bg/50"
                  }`}>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl ${
                        errors.images
                          ? "bg-error text-white"
                          : "bg-primary text-primary-foreground"
                      }`}>
                      <HiOutlinePlus className="w-8 h-8" />
                    </div>
                    <p
                      className={`mt-6 text-sm font-black uppercase tracking-widest ${errors.images ? "text-error" : "text-text"}`}>
                      Select Media
                    </p>
                    <p className="text-xs text-text-muted mt-2 font-medium">
                      JPEG, PNG, WEBP (Max 10MB each)
                    </p>
                  </div>
                </div>

                {/* Validation Proxy for Images moved to useEffect */}

                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative group aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-md">
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="p-2 bg-error cursor-pointer text-white rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                            <HiOutlineXMark className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-xs text-white px-2 py-0.5 rounded-full font-bold uppercase">
                          IMG {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {errors.images && (
                  <div className="p-3 rounded-xl bg-error/10 border border-error/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="w-2 h-2 rounded-full bg-error" />
                    <p className="text-[11px] font-black text-error uppercase tracking-wider">
                      {errors.images.message}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* General Information Section */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <HiOutlineInformationCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-text uppercase tracking-tight">
                  General Info
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <Input
                    label="Product Name"
                    placeholder="Enter short, descriptive title"
                    error={errors.title?.message}
                    {...register("title", {
                      required: "Product name is mandatory",
                      minLength: {
                        value: 3,
                        message: "Use at least 3 characters",
                      },
                      maxLength: {
                        value: 120,
                        message: "Keep title under 120 characters",
                      },
                    })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Textarea
                    label="Description"
                    placeholder="Briefly explain the fabric, cut, and vibe..."
                    error={errors.description?.message}
                    {...register("description", {
                      required: "Description is mandatory",
                      minLength: {
                        value: 10,
                        message: "Describe features in at least 10 characters",
                      },
                      maxLength: {
                        value: 150,
                        message: "Description limit is 150 characters",
                      },
                    })}
                  />
                </div>
                <Input
                  label="Brand"
                  placeholder="Snitch, Generic, etc."
                  error={errors.brand?.message}
                  {...register("brand")}
                />
                <Select
                  label="Category"
                  options={["Men", "Women", "Kids"]}
                  error={errors.category?.message}
                  {...register("category", { required: "Select a category" })}
                />
                <Select
                  label="Sub Category"
                  options={["T-Shirts", "Hoodies", "Jeans"]}
                  error={errors.subCategory?.message}
                  {...register("subCategory", {
                    required: "Select a sub-category",
                  })}
                />
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            {/* Pricing Section */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <HiOutlineCurrencyRupee className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-text uppercase tracking-tight">
                  Pricing
                </h2>
              </div>

              <div className="space-y-6">
                <Input
                  type="number"
                  label="Retail Price"
                  placeholder="0.00"
                  error={errors.price?.amount?.message}
                  {...register("price.amount", {
                    required: "Amount required",
                    min: { value: 0.01, message: "Price must be > 0" },
                  })}
                />
                <Input
                  type="number"
                  label="Sale Price (Optional)"
                  placeholder="0.00"
                  error={errors.price?.discountPrice?.message}
                  {...register("price.discountPrice", {
                    validate: (value) => {
                      if (!value) return true;
                      const amount = watch("price.amount");
                      return (
                        parseFloat(value) < parseFloat(amount) ||
                        "Must be less than Retail Price"
                      );
                    },
                  })}
                />
                <Select
                  label="Currency"
                  options={["INR", "USD", "EUR", "GBP", "JPY"]}
                  error={errors.price?.currency?.message}
                  {...register("price.currency")}
                />
              </div>
            </section>

            {/* Tags Section */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <HiOutlineTag className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-text uppercase tracking-tight">
                  Tags
                </h2>
              </div>

              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => handleAddTag(e, field)}
                      placeholder="Add tag and hit Enter"
                      className={`w-full px-4 py-3 bg-bg border rounded-2xl text-sm font-bold placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary outline-none transition-all ${
                        errors.tags ? "border-error" : "border-border"
                      }`}
                    />
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag, idx) => (
                        <Badge
                          key={idx}
                          className="group flex items-center gap-2 pl-3 pr-2 py-1.5 normal-case font-black text-[10px] tracking-widest bg-bg-muted hover:bg-primary/10 transition-colors">
                          {tag}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((t) => t !== tag),
                              )
                            }
                            className="text-text-muted hover:text-error transition-colors">
                            <HiOutlineXMark className="w-3.5 h-3.5" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              />
            </section>

            {/* Attributes Section */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <h3 className="font-black text-text  uppercase  mb-6">
                Product Options
              </h3>
              <div className="space-y-6">
                <Checkbox label="Featured Drop" {...register("isFeatured")} />
                <Checkbox label="New Arrival" {...register("isNewProduct")} />
                <Checkbox label="Sale Event" {...register("isSale")} />

                {isSale && (
                  <div className="pt-4 border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
                    <Input
                      type="date"
                      label="Event Expiry"
                      error={errors.saleEndDate?.message}
                      {...register("saleEndDate", {
                        required: "End date required for events",
                      })}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Quality Rating */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <div className="flex items-center gap-3 mb-6">
                <HiOutlineStar className="w-5 h-5 text-text" />
                <h2 className="text-sm font-black text-text uppercase">
                  Studio Rating
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-text-muted uppercase">
                    Base Score
                  </span>
                  <span className="text-lg font-black text-text">
                    {watch("averageRating") || 0}
                    <span className="text-xs text-text-muted">/5</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full h-1.5 bg-bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  {...register("averageRating")}
                />
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
