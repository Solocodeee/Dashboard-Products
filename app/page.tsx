'use client';

// import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
// import AddProductDrawer from "./components/AddProductDrawer"; 

export default function Home() {
  // const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <Sidebar />
      

      <main className="ml-64 p-3 bg-gray-50 min-h-screen">
        <StatsCards />
      </main>

      {/* <AddProductDrawer 
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}/> */}
    </div>
  );
}
