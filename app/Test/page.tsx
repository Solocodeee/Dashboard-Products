"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";  
import Add from "../Add/page";  

function Test() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterData = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedCategory, data]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setDeletingId(id);

      setTimeout(() => {
        const updatedData = data.filter((product) => product.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
        setDeletingId(null);

        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 ml-60">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">List of Products</h1>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Products</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg ">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsDrawerOpen(true)}  // فتح السلايدر عند الضغط على Add +
            className="text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300"
          >
            Add +
          </button>
        </div>

        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-blue-600 text-white text-xs uppercase">
            <tr className="text-center">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition-all duration-200 ease-in-out"
              >
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-contain rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4 capitalize">{product.category}</td>
                <td className="px-6 py-4 flex space-x-2 justify-center">
                  <Link
                    href={`/details/${product.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs me-2 transition-all duration-300"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/Updute/${product.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs me-2 transition-all duration-300"
                  >
                    Ubdate
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center justify-center space-x-1 min-w-[100px] transition-all duration-300"
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center p-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-6 py-2 mx-2 rounded-full text-sm font-semibold ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              } transition-all duration-300`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl p-6 z-50 rounded-l-3xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>
            </div>

            <Add />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Test;
