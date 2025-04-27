"use client";

import { FC, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ProductBarChart from "./ProductBarChart";
import TopProductsTable from "./TopProductsTable";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StatsCards: FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [topCategory, setTopCategory] = useState<string>("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setTotalProducts(data.length);

        const total = data.reduce((acc: number, product: any) => acc + parseFloat(product.price), 0);
        setAveragePrice(total / data.length);

        const categoryCount: { [key: string]: number } = {};
        data.forEach((product: any) => {
          const category = product.category;
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        const topCategory = Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b
        );
        setTopCategory(topCategory);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="bg-white p-4 rounded-t-xl shadow-sm" style={{ width: "330px", height: "200px" }}>
          <div className="text-gray-600 text-sm mb-1">Total Product</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalProducts.toLocaleString()}</div>
          <div className="text-green-500 text-xs font-medium mb-2">+1400 New Added</div>
          <div className="h-[100px]">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Total Products",
                    data: [23400, 16000, 30000, 22000, 10000, 24400, 8000], // يمكنك تعديل هذه البيانات لتتناسب مع البيانات الفعلية
                    borderColor: "rgba(59, 130, 246, 1)",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-xl shadow-sm" style={{ width: "330px", height: "200px" }}>
          <div className="text-gray-600 text-sm mb-1">Average Price</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">${averagePrice.toFixed(2)}</div>
          <div className="text-green-500 text-xs font-medium mb-2">+2% Today</div>
          <div className="h-[100px]">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Average Price",
                    data: [100, 150, 130, 110, 90, 150, 120], // يمكنك تعديل هذه البيانات لتتناسب مع البيانات الفعلية
                    borderColor: "rgba(234, 179, 8, 1)",
                    backgroundColor: "rgba(234, 179, 8, 0.2)",
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-xl shadow-sm" style={{ width: "330px", height: "200px" }}>
          <div className="text-gray-600 text-sm mb-1">Top Category</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{topCategory}</div>
          <div className="text-green-500 text-xs font-medium mb-2">+500 Products in this Category</div>
          <div className="h-[100px]">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Top Category",
                    data: [2000, 3000, 2500, 4000, 3500, 3000, 4200], // يمكنك تعديل هذه البيانات لتتناسب مع البيانات الفعلية
                    borderColor: "rgba(16, 185, 129, 1)",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      <div className="rounded-t-xl mt-5 flex flex-col md:flex-row gap-4 " style={{ width: "100%", height: "350px" }}>
        <TopProductsTable />
        <div className="p-4 rounded-t-xl" style={{ width: "500px", height: "200px" }}>
          <ProductBarChart />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
