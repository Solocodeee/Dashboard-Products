// Header.tsx
import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const MyButton: FC = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/Test"); 
  };

  return (
    <button
      onClick={handleNavigate}
      className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold"
    >
      Product
    </button>
  );
};

const Header: FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-6 container">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-black">Product Analytics</h2>
        <div className="flex gap-2 ml-4">
          <input
            type="date"
            className="border px-3 py-1 rounded-md text-sm text-gray-600"
            defaultValue="2021-10-06"
          />
          <input
            type="date"
            className="border px-3 py-1 rounded-md text-sm text-gray-600"
            defaultValue="2021-10-10"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <MyButton />
          <button className="px-4 py-1 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold">
            Customer
          </button>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          <FaPlus className="text-sm" />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Header;
