"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DetailMotor({ searchQuery }) {
  const [motors, setMotors] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [selectedMotor, setSelectedMotor] = useState(null);

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/motors");
        setMotors(response.data);
        const latestMotors = response.data
          .filter(motor => motor.tahun === 2024)
          .slice(0, 5);
        setNewReleases(latestMotors);
      } catch (error) {
        console.error("Error fetching motors:", error);
      }
    };

    fetchMotors();
  }, []);

  const handleMotorClick = (motor) => {
    setSelectedMotor(motor);
  };

  const closeModal = () => {
    setSelectedMotor(null);
  };

  const filteredMotors = motors.filter((motor) => {
    if (!searchQuery) return true;
    
    const search = searchQuery.toLowerCase();
    return (
      motor.brand.toLowerCase().includes(search) ||
      motor.model.toLowerCase().includes(search)
    );
  });

  const filteredNewReleases = newReleases.filter((motor) => {
    if (!searchQuery) return true;
    
    const search = searchQuery.toLowerCase();
    return (
      motor.brand.toLowerCase().includes(search) ||
      motor.model.toLowerCase().includes(search)
    );
  });

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9 h-screen overflow-y-auto pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMotors.map((motor) => (
              <div 
                key={motor.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                onClick={() => handleMotorClick(motor)}
              >
                <div className="relative h-48">
                  <img
                    src={motor.gambar}
                    alt={`${motor.brand} ${motor.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {motor.tahun}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{`${motor.brand} ${motor.model}`}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-blue-600 font-medium">
                      Rp {motor.harga.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {motor.kapasitas_mesin}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <div className="sticky top-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">New Release</h2>
              <p className="text-sm text-gray-500 mt-1">Latest motorcycles of 2024</p>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {filteredNewReleases.map((motor) => (
                  <div 
                    key={motor.id} 
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-100"
                    onClick={() => handleMotorClick(motor)}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">{`${motor.brand} ${motor.model}`}</h3>
                        <span className="text-blue-600 text-sm font-medium">
                          {motor.tahun}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{motor.kapasitas_mesin}</span>
                        <span>Rp {motor.harga.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMotor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl relative overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white hover:text-gray-200 z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-black/30"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <img
                  src={selectedMotor.gambar}
                  alt={`${selectedMotor.brand} ${selectedMotor.model}`}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                      {selectedMotor.tahun}
                    </span>
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                      {selectedMotor.kapasitas_mesin}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{`${selectedMotor.brand} ${selectedMotor.model}`}</h2>
                  <p className="text-xl font-semibold text-blue-400">
                    Rp {selectedMotor.harga.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 p-8 bg-white">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Manufacturing Year</p>
                          <p className="text-lg font-semibold text-gray-800">{selectedMotor.tahun}</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Engine Capacity</p>
                          <p className="text-lg font-semibold text-gray-800">{selectedMotor.kapasitas_mesin}</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Total Mileage</p>
                          <p className="text-lg font-semibold text-gray-800">{selectedMotor.kilometer.toLocaleString()} km</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Tax Status</p>
                          <p className={`text-lg font-semibold ${
                            selectedMotor.status_pajak.includes("Aktif")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}>
                            {selectedMotor.status_pajak}
                          </p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            selectedMotor.status_pajak.includes("Aktif")
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`} 
                          style={{ width: selectedMotor.status_pajak.includes("Aktif") ? '100%' : '30%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
