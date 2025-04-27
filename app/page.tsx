'use client';

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import AddProductDrawer from "./components/AddProductDrawer"; // ✅ تأكد إنه موجود
import Test from "./Test";

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Sidebar />
      

      <main className="ml-64 p-6 bg-gray-50 min-h-screen">
        <StatsCards />
      </main>

      <AddProductDrawer 
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
      />
      {/* <Test /> */}
    </div>
  );
}
