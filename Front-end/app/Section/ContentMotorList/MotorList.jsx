"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/api/axios";
import Card from "@/app/Components/Card/Card";

export default function MotorList({ selectedBrand, searchQuery }) {
  const [motorbikes, setMotorbikes] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/motors")
      .then((response) => {
        setMotorbikes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching motorbikes:", error);
      });
  }, []);

  // Filter motorbikes based on selected brand and search query
  const filteredMotorbikes = motorbikes.filter((bike) => {
    const matchesBrand = selectedBrand
      ? bike.brand.toLowerCase() === selectedBrand.toLowerCase()
      : true;
    
    const matchesSearch = searchQuery
      ? bike.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.tahun.toString().includes(searchQuery.toLowerCase())
      : true;

    return matchesBrand && matchesSearch;
  });

  return (
    <div className="mt-8">
      {filteredMotorbikes.length === 0 ? (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No motorcycles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="motor-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {filteredMotorbikes.map((motorbike) => (
            <Card
              key={motorbike.id}
              brand={motorbike.brand}
              gambar={motorbike.gambar}
              harga={motorbike.harga}
              model={motorbike.model}
              tahun={motorbike.tahun}
            />
          ))}
        </div>
      )}
    </div>
  );
}
