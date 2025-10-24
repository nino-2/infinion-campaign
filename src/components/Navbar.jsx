// src/components/Navbar.jsx
import React from 'react';
import { Bell, ChevronDown, Menu, SearchIcon } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-sm px-4 py-3 lg:px-5">
      <div className="flex items-center justify-between">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden pr-2 text-gray-700 hover:text-[#247b7b] focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 py-2.5 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 ml-2 lg:ml-0">
          <div className="bg-white p-2 rounded-sm shadow-md">
            <Bell size={20} />
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col items-start">
              <span className="font-nunito text-sm font-medium">Big Tech</span>
             
            </div>
            <ChevronDown size={20} className="text-[#247b7b]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;