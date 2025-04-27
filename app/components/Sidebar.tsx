import { FC } from 'react';
import { FaFileInvoice, FaCalendarAlt, FaComments, FaBell, FaCog, FaTachometerAlt } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';
import Image from 'next/image'; // لتحسين الصور في Next.js

const Sidebar: FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 z-50 flex flex-col justify-between">
      <div>
        <div className="flex items-center p-6">
          <Image src="/images/Subtract.svg" alt="Logo" width={32} height={32} className="rounded-full mr-4" />
          <div className="text-2xl font-bold text-blue-600">Base</div>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" />
          <SidebarItem icon={<BsGraphUp />} label="Analytics" />
          <SidebarItem icon={<FaFileInvoice />} label="Invoice" />
          <SidebarItem icon={<FaCalendarAlt />} label="Schedule" />
          <SidebarItem icon={<FaCalendarAlt />} label="Calendar" />
          <SidebarItem icon={<FaComments />} label="Messages" badge="26" />
          <SidebarItem icon={<FaBell />} label="Notification" />
          <SidebarItem icon={<FaCog />} label="Settings" />
        </nav>
      </div>

      <div className="p-4">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold mb-4" aria-label="Upgrade Now">
          Upgrade Now
        </button>
        <div className="flex items-center gap-3">
          <Image 
            src="https://i.pravatar.cc/40" 
            alt="avatar" 
            width={40} 
            height={40} 
            className="rounded-full object-cover" 
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm">Esain Arafat</p>
            <p className="text-xs text-gray-500">Free Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, badge }: { icon: React.ReactNode; label: string; badge?: string }) => (
  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center gap-3 text-gray-700">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

export default Sidebar;
