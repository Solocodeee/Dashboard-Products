'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if price is greater than zero before submitting
    if (parseFloat(price) <= 0) {
      Swal.fire("Error", "Price must be greater than zero", "error");
      return;
    }

    // Confirmation message before submitting
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      setLoading(true); // Enable loading state

      // Create FormData to send data with image
      const formData = new FormData();
      formData.append('image', fileInputRef.current?.files[0] || ''); // Upload image
      formData.append('title', productName);
      formData.append('price', price);
      formData.append('category', brand);
      formData.append('description', description);
      formData.append('negotiable', negotiable.toString());

      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Success message
          Swal.fire("Success", "Product added successfully!", "success");
          setTimeout(() => {
            router.push('/Test'); // Redirect after success
          }, 2000);

          // Reset fields after successful submission
          setProductName("");
          setBrand("");
          setPrice("");
          setNegotiable(false);
          setDescription("");
          setImage(null); // Reset the image field
        } else {
          // Error message
          Swal.fire("Error", "Failed to save the product.", "error");
        }
      } catch (error) {
        // Error handling
        Swal.fire("Error", "Error: Unable to add the product.", "error");
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white text-black overflow-auto">
      <button onClick={() => router.back()} className="self-start mb-4 text-gray-600">
        &larr;
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Product</h1>

      {/* Profile image */}
      <div className="flex items-center justify-center mb-6">
        <div
          onClick={handleImageClick}
          className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden relative"
        >
          {image ? (
            <img src={image} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <FaCamera className="text-gray-500 text-2xl" />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 overflow-auto">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Macbook Pro 2021 14”"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <select
            value={brand}
            onChange={e => setBrand(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a brand</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
          </select>
        </div>

        {/* Price and Negotiable */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="$1200"
              required
            />
          </div>
          <div className="flex items-center mt-6 space-x-2">
            <input
              type="checkbox"
              checked={negotiable}
              onChange={() => setNegotiable(!negotiable)}
              className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">Negotiable</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="This is the new creation from Apple..."
            required
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <FaCamera className="text-white" />
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
