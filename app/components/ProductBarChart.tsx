import React from 'react';
// import SalesDoughnutChart from './SalesDoughnutChart';

const ProductBarChart = () => {
  const productAddByMonth = [
    { month: 'Jan', value: 23400, bgColor: 'bg-blue-500' },
    { month: 'Feb', value: 16000, bgColor: 'bg-green-500' },
    { month: 'Mar', value: 30000, bgColor: 'bg-red-500' },
    { month: 'Apr', value: 22000, bgColor: 'bg-yellow-500' },
    { month: 'May', value: 10000, bgColor: 'bg-purple-500' },
    { month: 'Jun', value: 24400, bgColor: 'bg-pink-500' },
    { month: 'Jul', value: 8000, bgColor: 'bg-teal-500' },
  ];

  const maxValue = Math.max(...productAddByMonth.map(item => item.value));

  return (
    <>
      <div className="bg-white p-6 rounded-lg  " style={{ width: "450px" }}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Add by Month</h2>
        <div className="space-y-4">
          {productAddByMonth.map((item) => (
            <div key={item.month} className="flex items-center">
              <span className="w-16 text-sm font-medium text-gray-600">{item.month}</span>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.bgColor} transition-all duration-500`} 
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
         {/* <SalesDoughnutChart />  */}
      </div>
    </>
  );
};

export default ProductBarChart;
