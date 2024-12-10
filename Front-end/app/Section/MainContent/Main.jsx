"use client";
import React, { useState } from "react";
import Banner from "../ContentBanner/Banner";
import MotorList from "../ContentMotorList/MotorList";

// Data Constants
const BRANDS = [
  { name: "Honda" },
  { name: "Yamaha" },
  { name: "Suzuki" },
  { name: "Kawasaki" },
  { name: "Piaggio" },
];

const STATS_DATA = [
  {
    title: "Total Listings",
    value: "2,451",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Active Users",
    value: "1,234",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "Sold This Month",
    value: "384",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Average Price",
    value: "Rp 15.5M",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

// Component Functions
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold mt-1 text-blue-600">{value}</h3>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg text-blue-600">{icon}</div>
    </div>
  </div>
);

const PromoCard = ({ title, description, buttonText, buttonColor, icon, gradientFrom, gradientTo }) => (
  <div className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-xl p-6 shadow`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className={`text-${gradientFrom}-100 mb-4`}>{description}</p>
        <button className={`btn bg-blue-600 border-none text-white  text-${buttonColor} px-6 py-2 rounded-lg font-semibold hover:bg-${gradientFrom}-50 transition-colors`}>
          {buttonText}
        </button>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

export default function Main() {
  const [selectedBrand, setSelectedBrand] = useState("Honda");

  const handleBrandClick = (brandName) => {
    setSelectedBrand(selectedBrand === brandName ? null : brandName);
  };

  return (
    <div className="ms-[270px] p-6 min-h-screen bg-white">
      <div className="wraper-content">
        <Banner />

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Promotional Section */}
        <div className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PromoCard
              title="Special Offer!"
              description="Get special discounts up to 20% for selected motorcycles"
              buttonText="Learn More"
              buttonColor="blue-600"
              icon="🏍️"
              gradientFrom="blue-600"
              gradientTo="blue-700"
            />
            <PromoCard
              title="Trade-in Program"
              description="Trade your old motorcycle and get extra value"
              buttonText="Trade Now"
              buttonColor="purple-600"
              icon="🔄"
              gradientFrom="purple-600"
              gradientTo="purple-700"
            />
          </div>
        </div>

        {/* Brand Section */}
        <div className="my-7">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Popular Brands</h2>
          <div className="flex flex-wrap gap-4">
            {BRANDS.map((brand) => (
              <button
                key={brand.name}
                onClick={() => handleBrandClick(brand.name)}
                className={`flex items-center gap-2 px-6 py-3 text-gray-500 border border-gray-200 rounded-lg transition-all shadow-sm ${
                  selectedBrand === brand.name ? "bg-blue-600 text-white" : ""
                }`}
              >
                <span className="font-medium">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Motor Listings */}
        <div className="rounded-md p-6 mb-8 border">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Available Motorcycles</h2>
            <p className="text-gray-900/50">Motor yang sedang tersedia di DwiksMotors</p>
          </div>
          <MotorList selectedBrand={selectedBrand} />
        </div>
      </div>
    </div>
  );
}
