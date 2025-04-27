"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AddProductDrawer from "../components/AddProductDrawer";
import Image from "next/image"; // استيراد Image من next/image لتحسين الصور

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    if (search) {
      const searchTerm = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }
    
    setFilteredProducts(result);
  }, [search, category, products]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDelete = async (id: number) => {
    try {
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError("Failed to delete product");
      console.error("Error deleting product:", err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product); 
    setIsEditDrawerOpen(true); 
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setIsEditDrawerOpen(false); 
  };

  return (
    <div className="max-w-2xl p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-black">Products Management</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded text-black text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded text-black text-sm"
          >
            <option value="All">All Categories</option>
            <option value="men's clothing">Men s Clothing</option>
            <option value="women's clothing">Women s Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-black text-sm">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-black text-sm">No products found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Image src={product.image} alt={product.title} className="h-10 w-10 object-contain" width={40} height={40} />
                  </td>
                  <td className="px-6 py-4 text-black text-sm">
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-black">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 text-black text-sm">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-black text-sm">{product.category}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {isEditDrawerOpen && currentProduct && (
        <AddProductDrawer
          isOpen={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          onAddProduct={handleUpdateProduct}
          product={currentProduct}
        />
      )}
    </div>
  );
}
