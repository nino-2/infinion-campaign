// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CircleGauge, CircleQuestionMark, Megaphone, Plus, Settings, Siren } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menulist = [
    { name: 'New Campaign', href: '/campaign/new', icon: Plus },
    { name: 'Overview', href: '/overview', icon: CircleGauge },
    { name: 'Campaign', href: '/campaigns', icon: Megaphone },
    { name: 'Market Intelligence', href: '/market-intelligence', icon: Siren },
    { name: 'Account Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0  left-0 z-50 w-64 bg-[#f0f4f4] shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 `}
      >
        {/* Logo */}
        <div className="flex items-center gap-5 px-4 h-16">
          <img src="/scrutz.png" alt="Scrutz" className="h-7 w-auto object-contain lg:h-10" />
          <h1 className="text-2xl font-worksans font-bold bg-gradient-to-r from-[#247b7b] to-[#3b247b] bg-clip-text text-transparent">
            Scrutz
          </h1>
        </div>

        <div className="mt-10 px-4">
          {menulist.map((menu, index) => {
            const Icon = menu.icon;
            const isNewCampaign = menu.name === 'New Campaign';
            return (
              <Link
                key={index}
                to={menu.href}
                onClick={onClose} // Close sidebar on mobile after click
                className={`flex items-center px-4 py-3 mb-2 text-sm font-nunito font-semibold rounded-lg ${
                  isNewCampaign
                    ? 'bg-[#247b7b] mb-8 text-white hover:bg-[#1f6666]'
                    : location.pathname === menu.href
                    ? 'bg-white text-[#247b7b]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {menu.name}
              </Link>
            );
          })}

          <div className="bg-white p-5 shadow-md text-center mt-8">
            <CircleQuestionMark className="mx-auto mb-3 h-6 w-6 text-[#247b7b]" />
            <h2 className="font-nunito font-semibold bg-gradient-to-r from-[#3b247b] to-[#247b7b] bg-clip-text text-transparent mb-2">
              Need help?
            </h2>
            <p className="text-sm text-gray-700">We're readily available to provide help</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;