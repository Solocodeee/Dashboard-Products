import React from 'react';

const TopSellingProducts = () => {
  const products = [
    { sn: 9, name: 'Blutooth Devices', price: '$10', totalOrder: '34,666 Piece', totalSales: '$3.46,660' },
    { sn: 9, name: 'Airdot', price: '$15', totalOrder: '20,000 Piece', totalSales: '$3.00,000' },
    { sn: 9, name: 'Shoes', price: '$10', totalOrder: '15,000 Piece', totalSales: '$1.50,000' },
    { sn: 4, name: 'Kids T-Shirt', price: '$12', totalOrder: '10,000 Piece', totalSales: '$1.20,000' },
    { sn: 5, name: 'Smart Watch', price: '$12', totalOrder: '10,000 Piece', totalSales: '$1.20,000' },
    { sn: 5, name: 'Girls Top', price: '$12', totalOrder: '10,000 Piece', totalSales: '$1.20,000' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-full sm:max-w-2 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Top Selling Products</h3>
      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
        See More
      </button>
    </div>
  
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="px-4 py-2 font-medium uppercase">SN</th>
            <th className="px-4 py-2 font-medium uppercase">Name</th>
            <th className="px-4 py-2 font-medium uppercase">Price</th>
            <th className="px-4 py-2 font-medium uppercase">Total Order</th>
            <th className="px-4 py-2 font-medium uppercase">Total Sales</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-gray-500">{product.sn}</td>
              <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-500">{product.price}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-500">{product.totalOrder}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-500">{product.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  

  );
};

export default TopSellingProducts;