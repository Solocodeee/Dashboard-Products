"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import Swal from "sweetalert2"; 
import Image from 'next/image'; // استيراد مكون Image

export default function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProductName(data.title);
        setBrand(data.category);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.image);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

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

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      setLoading(true); 

      const formData = new FormData();
      formData.append('image', fileInputRef.current?.files?.[0] || ''); 
      formData.append('title', productName);
      formData.append('price', price);
      formData.append('category', brand);
      formData.append('description', description);
      formData.append('negotiable', negotiable.toString());

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          Swal.fire("Success", "Product updated successfully!", "success");
          setTimeout(() => {
            router.push('/Test'); 
          }, 2000);
        } else {
          Swal.fire("Error", "Failed to update the product.", "error");
        }
      // } catch (error) {
      //   Swal.fire("Error", "Error: Unable to update the product.", "error");
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white text-black">
      <button onClick={() => router.back()} className="self-start mb-4 text-gray-600">
        &larr;
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Update Product</h1>

      <div className="flex items-center justify-center mb-6">
        <div
          onClick={handleImageClick}
          className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden relative"
        >
          {image ? (
            <Image src={image} alt="Selected" className="w-full h-full object-cover" width={100} height={50} />
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

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="This is the new creation of Apple..."
            required
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
            disabled={loading} 
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <FaCamera className="text-white" />
                <span>Update Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
