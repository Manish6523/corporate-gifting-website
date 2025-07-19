import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
// No need to import App.css when using Tailwind for all styling

// Initial state for the form, matching your table schema
const initialState = {
  id: "",
  title: "",
  description: "",
  category: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  tags: "",
  brand: "",
  sku: "",
  weight: 0,
  warrantyInformation: "",
  shippingInformation: "",
  availabilityStatus: "In Stock",
  returnPolicy: "30-day return policy",
  minimumOrderQuantity: 1,
  images: "",
  thumbnail: "",
  dimensions_width: 0,
  dimensions_height: 0,
  dimensions_depth: 0,
  meta_barcode: "",
  reviews: [
    {
      date: "2025-05-15T12:30:00.000Z",
      rating: 5,
      comment:
        "Exceeded expectations in every way. High quality and totally worth the price!",
      reviewerName: "Aarav Mehta",
      reviewerEmail: "aarav.mehta@example.com",
      reviewerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      date: "2025-05-10T09:00:00.000Z",
      rating: 4,
      comment:
        "The product was well-packaged and arrived earlier than expected. Works great so far.",
      reviewerName: "Saanvi Sharma",
      reviewerEmail: "saanvi.sharma@example.com",
      reviewerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      date: "2025-05-08T18:45:00.000Z",
      rating: 5,
      comment:
        "Fantastic value for money. I’d recommend this to anyone looking for reliability.",
      reviewerName: "Kabir Rajput",
      reviewerEmail: "kabir.rajput@example.com",
      reviewerAvatar: "https://randomuser.me/api/portraits/men/15.jpg",
    },
  ],
};

// A reusable input component for consistency
const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  step,
  max,
  min,
  readOnly = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      step={step}
      max={max}
      min={min}
      readOnly={readOnly}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

// A reusable textarea component
const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

function A() {
  const [product, setProduct] = useState(initialState);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val =
      type === "number" ? (value === "" ? "" : parseFloat(value)) : value;
    setProduct({ ...product, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ type: "", text: "" });

    try {
      // This object's keys MUST match your Supabase column names exactly,

      // including those that require quotes.

      const productData = {
        id: parseInt(product.id),

        title: product.title,

        description: product.description,

        category: product.category,

        price: product.price,

        discountPercentage: product.discountPercentage,

        rating: product.rating,

        stock: parseInt(product.stock),

        tags: product.tags,

        brand: product.brand,

        sku: product.sku,

        weight: parseInt(product.weight),

        warrantyInformation: product.warrantyInformation,

        shippingInformation: product.shippingInformation,

        availabilityStatus: product.availabilityStatus,

        returnPolicy: product.returnPolicy,

        minimumOrderQuantity: parseInt(product.minimumOrderQuantity),

        images: product.images, // Stored as plain text

        thumbnail: product.thumbnail,

        dimensions_width: product.dimensions_width,

        dimensions_height: product.dimensions_height,

        dimensions_depth: product.dimensions_depth,

        meta_createdAt: new Date().toISOString(),

        meta_updatedAt: new Date().toISOString(),

        meta_barcode: product.meta_barcode
          ? parseInt(product.meta_barcode)
          : null,

        reviews: product.reviews || "[]",
      };

      const { data, error } = await supabase

        .from("products")

        .insert([productData])

        .select()

        .single(); // Use single() to get the object back, not an array

      if (error) throw error;

      setMessage({
        type: "success",

        text: `✅ Product "${data.title}" added successfully!`,
      });

      setProduct(initialState); // Reset form after successful submission
    } catch (error) {
      setMessage({ type: "error", text: `❌ Error: ${error.message}` });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* -- Core Details -- */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Core Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <FormInput
                label="ID"
                name="id"
                type="number"
                value={product.id}
                onChange={handleChange}
                required
                placeholder="e.g., 101"
              />
              <FormInput
                label="Title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
                placeholder="e.g., Wireless Mouse"
              />
              <FormInput
                label="Brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="e.g., Logitech"
              />
              <FormInput
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="e.g., Electronics"
              />
              <FormInput
                label="SKU"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                placeholder="e.g., LOGI-WM-123"
              />
              <FormInput
                label="Tags"
                name="tags"
                value={product.tags}
                onChange={handleChange}
                placeholder="e.g., wireless, gaming"
              />
            </div>
            <div className="mt-6">
              <FormTextarea
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Detailed product description..."
              />
            </div>
          </fieldset>

          {/* -- Pricing & Inventory -- */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Pricing & Inventory
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <FormInput
                label="Price ($)"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                step="0.01"
              />
              <FormInput
                label="Discount (%)"
                name="discountPercentage"
                type="number"
                value={product.discountPercentage}
                onChange={handleChange}
                step="0.01"
              />
              <FormInput
                label="Stock"
                name="stock"
                type="number"
                value={product.stock}
                onChange={handleChange}
              />
              <FormInput
                label="Min. Order Qty"
                name="minimumOrderQuantity"
                type="number"
                value={product.minimumOrderQuantity}
                onChange={handleChange}
              />
              <FormInput
                label="Rating (0-5)"
                name="rating"
                type="number"
                value={product.rating}
                onChange={handleChange}
                step="0.1"
                max="5"
                min="0"
              />
              <FormInput
                label="Availability"
                name="availabilityStatus"
                value={"In Stock"} // Static value for now
                // onChange={handleChange}
                readOnly
              />
            </div>
          </fieldset>

          {/* -- Specifications -- */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Specifications
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              <FormInput
                label="Weight (g)"
                name="weight"
                type="number"
                value={product.weight}
                onChange={handleChange}
              />
              <FormInput
                label="Width (cm)"
                name="dimensions_width"
                type="number"
                value={product.dimensions_width}
                onChange={handleChange}
                step="0.1"
              />
              <FormInput
                label="Height (cm)"
                name="dimensions_height"
                type="number"
                value={product.dimensions_height}
                onChange={handleChange}
                step="0.1"
              />
              <FormInput
                label="Depth (cm)"
                name="dimensions_depth"
                type="number"
                value={product.dimensions_depth}
                onChange={handleChange}
                step="0.1"
              />
            </div>
          </fieldset>

          {/* -- Media -- */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Media
            </legend>
            <div className="space-y-6 mt-4">
              <FormInput
                label="Thumbnail URL"
                name="thumbnail"
                value={product.thumbnail}
                onChange={handleChange}
                placeholder="https://.../thumbnail.jpg"
              />
              <FormTextarea
                label="Image URLs (comma-separated)"
                name="images"
                value={product.images}
                onChange={handleChange}
                placeholder="https://.../img1.jpg, https://.../img2.jpg"
              />
            </div>
          </fieldset>

          {/* -- Shipping & Policies -- */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Shipping & Policies
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <FormInput
                label="Warranty Information"
                name="warrantyInformation"
                // value={product.warrantyInformation}
                value={"1-Year Limited Warranty"}
                // onChange={handleChange}
                readOnly
                placeholder="e.g., 1-Year Limited Warranty"
              />
              <FormInput
                label="Shipping Information"
                name="shippingInformation"
                // value={product.shippingInformation}
                value={"Ships in 3-5 business days"}
                readOnly
                onChange={handleChange}
                placeholder="e.g., Ships in 3-5 business days"
              />
              <FormInput
                label="Return Policy"
                name="returnPolicy"
                // value={product.returnPolicy}
                value={"30-day return policy"}
                onChange={handleChange}
                readOnly
              />
            </div>
          </fieldset>

          {/* -- Meta & Advanced -- */}
          <fieldset className="border border-gray-200 rounded-lg p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Meta & Advanced
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <FormInput
                label="Barcode (EAN/UPC)"
                name="meta_barcode"
                value={product.meta_barcode}
                onChange={handleChange}
                placeholder="e.g., 8901234567890"
              />
            </div>
          </fieldset>

          {message.text && (
            <div
              className={`p-4 mb-4 text-sm rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
              role="alert"
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default A;
