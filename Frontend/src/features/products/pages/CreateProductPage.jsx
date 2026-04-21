import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  HiOutlineCloudArrowUp,
  HiOutlineXMark,
  HiOutlinePlus,
  HiOutlineTag,
  HiOutlineInformationCircle,
  HiOutlineViewColumns,
  HiOutlineStar,
  HiOutlineTrash,
} from "react-icons/hi2";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Select from "../../../shared/components/Select";
import Textarea from "../../../shared/components/Textarea";
import Checkbox from "../../../shared/components/Checkbox";
import Badge from "../../../shared/components/Badge";
import useProduct from "../hooks/useProduct";

const VariantAttributes = ({ control, register, variantIndex, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variantIndex}.attributes`,
  });

  return (
    <div className="space-y-3 mt-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-text">Attributes</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ key: "", value: "" })}
          className="text-xs py-1 px-2">
          <HiOutlinePlus className="w-3 h-3 mr-1 inline" /> Add Attribute
        </Button>
      </div>
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-3 items-start">
          <div className="flex-1">
            <Input
              placeholder="e.g. Size"
              {...register(`variants.${variantIndex}.attributes.${index}.key`, {
                required: "Key required",
              })}
              error={
                errors?.variants?.[variantIndex]?.attributes?.[index]?.key
                  ?.message
              }
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="e.g. XL"
              {...register(
                `variants.${variantIndex}.attributes.${index}.value`,
                { required: "Value required" },
              )}
              error={
                errors?.variants?.[variantIndex]?.attributes?.[index]?.value
                  ?.message
              }
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="p-3 mt-1 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-colors">
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const CreateProductPage = () => {
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const { handleCreateProductHandler } = useProduct();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      brand: "Generic",
      category: "",
      subCategory: "",
      tags: [],
      isFeatured: false,
      isNewProduct: true,
      isSale: false,
      averageRating: 0,
      variants: [
        {
          stock: 0,
          isDefault: true,
          attributes: [{ key: "Size", value: "" }],
          price: { amount: "", discountPrice: 0, currency: "INR" },
          weight: 0,
          dimensions: { length: 0, width: 0, height: 0 },
          status: "Active",
          images: [],
        },
      ],
    },
  });

  const isSale = watch("isSale");
  const variantsData = watch("variants");

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    const currentImages = getValues(`variants.${index}.images`) || [];

    if (currentImages.length + validFiles.length > 10) {
      toast.error("You can only upload up to 10 images per variant");
      return;
    }

    const newImages = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedImages = [...currentImages, ...newImages];
    setValue(`variants.${index}.images`, updatedImages, {
      shouldValidate: true,
    });
  };

  const removeImage = (variantIndex, imageIndex) => {
    const currentImages = getValues(`variants.${variantIndex}.images`) || [];
    const updatedImages = [...currentImages];
    URL.revokeObjectURL(updatedImages[imageIndex].url);
    updatedImages.splice(imageIndex, 1);
    setValue(`variants.${variantIndex}.images`, updatedImages, {
      shouldValidate: true,
    });
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

    // Basic Fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);

    // Tags
    if (data.tags?.length) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });
    }

    // Booleans
    formData.append("isFeatured", String(data.isFeatured));
    formData.append("isNewProduct", String(data.isNewProduct));
    formData.append("isSale", String(data.isSale));

    if (data.saleEndDate) formData.append("saleEndDate", data.saleEndDate);
    if (data.averageRating)
      formData.append("averageRating", data.averageRating);

    // Variants
    if (data.variants?.length) {
      data.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][stock]`, variant.stock);
        formData.append(
          `variants[${index}][isDefault]`,
          String(variant.isDefault),
        );
        formData.append(`variants[${index}][weight]`, variant.weight || 0);
        formData.append(`variants[${index}][status]`, variant.status);
        formData.append(
          `variants[${index}][price][amount]`,
          variant.price.amount,
        );
        formData.append(
          `variants[${index}][price][discountPrice]`,
          variant.price.discountPrice || 0,
        );
        formData.append(
          `variants[${index}][price][currency]`,
          variant.price.currency,
        );

        if (variant.dimensions) {
          formData.append(
            `variants[${index}][dimensions][length]`,
            variant.dimensions.length || 0,
          );
          formData.append(
            `variants[${index}][dimensions][width]`,
            variant.dimensions.width || 0,
          );
          formData.append(
            `variants[${index}][dimensions][height]`,
            variant.dimensions.height || 0,
          );
        }

        // Attributes
        if (variant.attributes?.length) {
          variant.attributes.forEach((attr) => {
            if (attr.key && attr.value) {
              formData.append(
                `variants[${index}][attributes][${attr.key}]`,
                attr.value,
              );
            }
          });
        }

        // Images
        if (variant.images?.length) {
          variant.images.forEach((img) => {
            formData.append(`variants[${index}][images]`, img.file);
          });
        }
      });
    }

    try {
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await handleCreateProductHandler(formData);

      // reset();
      // navigate("/");
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
          <div className="lg:col-span-8 space-y-10">
            {/* General Info */}
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

            {/* Variants */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <HiOutlineViewColumns className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-text uppercase tracking-tight">
                      Product Variants
                    </h2>
                    <p className="text-xs text-text-muted mt-1">
                      Add size, color, stock, images, and pricing per variant.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    appendVariant({
                      stock: 0,
                      isDefault: false,
                      attributes: [{ key: "Size", value: "" }],
                      price: { amount: "", discountPrice: 0, currency: "INR" },
                      weight: 0,
                      dimensions: { length: 0, width: 0, height: 0 },
                      status: "Active",
                      images: [],
                    })
                  }
                  size="sm">
                  <HiOutlinePlus className="w-5 h-5 mr-1 inline" /> Add Variant
                </Button>
              </div>

              <div className="space-y-8">
                {variantFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-6 border border-border rounded-2xl bg-bg/50 relative group">
                    {variantFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="absolute top-4 right-4 p-2 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-colors opacity-0 group-hover:opacity-100">
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    )}

                    <h3 className="text-sm font-black text-text uppercase mb-6">
                      Variant {index + 1}{" "}
                      {watch(`variants.${index}.isDefault`) && "(Default)"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Input
                              type="number"
                              label="Stock"
                              {...register(`variants.${index}.stock`, {
                                required: "Stock is required",
                                min: 0,
                              })}
                              error={errors?.variants?.[index]?.stock?.message}
                            />
                          </div>
                          <div className="flex-1">
                            <Select
                              label="Status"
                              options={["Active", "Out of stock", "Hidden"]}
                              {...register(`variants.${index}.status`)}
                            />
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Input
                              type="number"
                              label="Price"
                              {...register(`variants.${index}.price.amount`, {
                                required: "Price required",
                                min: 0,
                              })}
                              error={
                                errors?.variants?.[index]?.price?.amount
                                  ?.message
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <Input
                              type="number"
                              label="Discount Price"
                              {...register(
                                `variants.${index}.price.discountPrice`,
                                { min: 0 },
                              )}
                              error={
                                errors?.variants?.[index]?.price?.discountPrice
                                  ?.message
                              }
                            />
                          </div>
                        </div>

                        <Select
                          label="Currency"
                          options={["INR", "USD", "EUR", "GBP", "JPY"]}
                          {...register(`variants.${index}.price.currency`)}
                        />

                        <div className="pt-2">
                          <Checkbox
                            label="Set as Default Variant"
                            {...register(`variants.${index}.isDefault`)}
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <Input
                            type="number"
                            label="Weight (kg)"
                            {...register(`variants.${index}.weight`)}
                          />
                        </div>
                        
                        <div>
                          <span className="text-[12px] text-text-muted font-bold block px-1 mb-2">
                            DIMENSIONS (L×W×H)
                          </span>
                          <div className="grid grid-cols-3 gap-4">
                            <Input
                              type="number"
                              placeholder="Length"
                              {...register(
                                `variants.${index}.dimensions.length`,
                              )}
                            />
                            <Input
                              type="number"
                              placeholder="Width"
                              {...register(
                                `variants.${index}.dimensions.width`,
                              )}
                            />
                            <Input
                              type="number"
                              placeholder="Height"
                              {...register(
                                `variants.${index}.dimensions.height`,
                              )}
                            />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border/50">
                          <VariantAttributes
                            control={control}
                            register={register}
                            variantIndex={index}
                            errors={errors}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Variant Images */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <HiOutlineCloudArrowUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-text uppercase">
                            Variant Gallery
                          </h4>
                          <p className="text-[10px] text-text-muted mt-0.5">
                            Upload images specific to this variant
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <label
                          className={`block relative overflow-hidden border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 group ${
                            errors?.variants?.[index]?.images
                              ? "border-error bg-error/5"
                              : "border-border bg-bg/50"
                          }`}>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleImageChange(e, index)}
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                          />
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl ${
                                errors?.variants?.[index]?.images
                                  ? "bg-error text-white"
                                  : "bg-primary text-primary-foreground"
                              }`}>
                              <HiOutlinePlus className="w-6 h-6" />
                            </div>
                            <p
                              className={`mt-4 text-xs font-black uppercase tracking-widest ${errors?.variants?.[index]?.images ? "text-error" : "text-text"}`}>
                              Select Media
                            </p>
                          </div>
                        </label>

                        {(variantsData?.[index]?.images || []).length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
                            {(variantsData?.[index]?.images || []).map(
                              (img, imgIndex) => (
                                <div
                                  key={imgIndex}
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
                                        e.preventDefault();
                                        removeImage(index, imgIndex);
                                      }}
                                      className="p-2 bg-error cursor-pointer text-white rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                                      <HiOutlineXMark className="w-5 h-5" />
                                    </button>
                                  </div>
                                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-xs text-white px-2 py-0.5 rounded-full font-bold uppercase">
                                    IMG {imgIndex + 1}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* Tags */}
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

            {/* Options */}
            <section className="bg-bg-surface border border-border rounded-3xl p-8 shadow-2xl shadow-black/5">
              <h3 className="font-black text-text uppercase mb-6">
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

            {/* Rating */}
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
