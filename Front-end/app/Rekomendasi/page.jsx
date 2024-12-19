"use client";

import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    harga_min: "",
    harga_max: "",
    kilometer_min: "",
    kilometer_max: "",
    tahun_min: "",
    tahun_max: "",
    kapasitas_mesin: "Semua",
    brand: "Semua",
    model: "Semua",
    status_pajak: "Semua",
  });

  const [formattedValues, setFormattedValues] = useState({
    harga_min: "",
    harga_max: "",
    kilometer_min: "",
    kilometer_max: "",
  });

  const [weights, setWeights] = useState({
    weight_harga: 3,
    weight_kilometer: 3,
    weight_status_pajak: 3,
  });

  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedMotor, setSelectedMotor] = useState(null);

  const formatNumber = (value) => {
    // Remove non-digit characters
    const number = value.replace(/\D/g, "");
    // Format with thousand separator
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Convert weights from 1-10 scale to 0-1 scale
  const normalizeWeights = (weights) => {
    const total = Object.values(weights).reduce(
      (sum, weight) => sum + weight,
      0
    );
    return {
      weight_harga: weights.weight_harga / total,
      weight_kilometer: weights.weight_kilometer / total,
      weight_status_pajak: weights.weight_status_pajak / total,
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      ["harga_min", "harga_max", "kilometer_min", "kilometer_max"].includes(
        name
      )
    ) {
      // Format display value
      const formattedValue = formatNumber(value);
      setFormattedValues((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      // Store actual numeric value for submission
      setFilters((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ""),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    setWeights((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert weights to 0-1 scale before sending
    const normalizedWeights = normalizeWeights(weights);

    // Prepare request data
    const requestData = {
      // Basic filters with proper type conversion and fallbacks
      harga_min: parseInt(filters.harga_min) || 0,
      harga_max: parseInt(filters.harga_max) || 1000000000,
      kilometer_min: parseInt(filters.kilometer_min) || 0,
      kilometer_max: parseInt(filters.kilometer_max) || 1000000,
      tahun_min: parseInt(filters.tahun_min) || 2000,
      tahun_max: parseInt(filters.tahun_max) || 2024,

      // Category filters with proper handling of "Semua"
      kapasitas_mesin:
        filters.kapasitas_mesin === "Semua" ? "Semua" : filters.kapasitas_mesin,
      brand: filters.brand === "Semua" ? "Semua" : filters.brand,
      model: filters.model === "Semua" ? "Semua" : filters.model,
      status_pajak:
        filters.status_pajak === "Semua" ? "Semua" : filters.status_pajak,

      // Normalized weights
      weight_harga: normalizedWeights.weight_harga,
      weight_kilometer: normalizedWeights.weight_kilometer,
      weight_status_pajak: normalizedWeights.weight_status_pajak,
    };

    console.log("Request data:", requestData);

    // Send request to backend
    fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // Handle case where no results are found
          setFilteredResults([]);
          console.log("Search message:", data.message);
          // You might want to show this message to the user
        } else {
          setFilteredResults(data);
          console.log("Search results:", data);
        }
      })
      .catch((error) => {
        console.error("Error searching motors:", error);
        setFilteredResults([]);
      });
  };

  const getHighestScore = (motors) => {
    if (!motors.length) return 0;
    return Math.max(...motors.map(motor => motor.saw_score));
  };

  const handleMotorClick = (motor) => {
    setSelectedMotor(motor);
  };

  const closeModal = () => {
    setSelectedMotor(null);
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="flex ms-[270px]">
        <div className="flex-1 p-8 w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Rekomendasi Motor</h1>
            <p className="mt-2 text-gray-600">Temukan motor yang sesuai dengan preferensi Anda</p>
          </div>
          
          <style jsx>{`
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              -webkit-box-shadow: 0 0 0 30px white inset !important;
              -webkit-text-fill-color: #2F7B5D !important;
            }
          `}</style>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-8 rounded-xl border border-[#2F7B5D]/20"
          >
            {/* Harga Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Harga Minimum</span>
                </label>
                <input
                  type="text"
                  name="harga_min"
                  value={formattedValues.harga_min}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="Rp 0"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Harga Maximum</span>
                </label>
                <input
                  type="text"
                  name="harga_max"
                  value={formattedValues.harga_max}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="Rp 1.000.000.000"
                />
              </div>
            </div>

            {/* Kilometer Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Kilometer Minimum</span>
                </label>
                <input
                  type="text"
                  name="kilometer_min"
                  value={formattedValues.kilometer_min}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="0"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Kilometer Maximum</span>
                </label>
                <input
                  type="text"
                  name="kilometer_max"
                  value={formattedValues.kilometer_max}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="1.000.000"
                />
              </div>
            </div>

            {/* Tahun Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Tahun Minimum</span>
                </label>
                <input
                  type="number"
                  name="tahun_min"
                  value={filters.tahun_min}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="2000"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Tahun Maximum</span>
                </label>
                <input
                  type="number"
                  name="tahun_max"
                  value={filters.tahun_max}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="2024"
                />
              </div>
            </div>

            {/* Other Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Kapasitas Mesin</span>
                </label>
                <select
                  name="kapasitas_mesin"
                  value={filters.kapasitas_mesin}
                  onChange={handleInputChange}
                  className="select select-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                >
                  <option value="Semua">Semua</option>
                  <option value="110">110 CC</option>
                  <option value="125">125 CC</option>
                  <option value="150">150 CC</option>
                  <option value="250">250 CC</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Brand</span>
                </label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleInputChange}
                  className="select select-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                >
                  <option value="Semua">Semua</option>
                  <option value="Honda">Honda</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Kawasaki">Kawasaki</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Model</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={filters.model}
                  onChange={handleInputChange}
                  className="input input-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                  placeholder="Model motor"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-900 font-medium">Status Pajak</span>
                </label>
                <select
                  name="status_pajak"
                  value={filters.status_pajak}
                  onChange={handleInputChange}
                  className="select select-bordered bg-white text-gray-900 hover:border-[#2F7B5D] focus:border-[#2F7B5D] focus:outline-none"
                >
                  <option value="Semua">Semua</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak">Tidak Aktif</option>
                </select>
              </div>
            </div>

            {/* Weight Inputs */}
            <div className="p-6 bg-white rounded-xl border border-[#2F7B5D]/20">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Bobot Kriteria
                <span className="text-sm font-normal text-[#2F7B5D] ml-2">(Skala Kepentingan)</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-900">Bobot Harga</span>
                  </label>
                  <div className="flex flex-wrap gap-10 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="1"
                        checked={weights.weight_harga === 1}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sangat Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="2"
                        checked={weights.weight_harga === 2}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="3"
                        checked={weights.weight_harga === 3}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sedang</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="4"
                        checked={weights.weight_harga === 4}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="5"
                        checked={weights.weight_harga === 5}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sangat Penting</span>
                    </label>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-900">Bobot Kilometer</span>
                  </label>
                  <div className="flex flex-wrap gap-10 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="1"
                        checked={weights.weight_kilometer === 1}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sangat Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="2"
                        checked={weights.weight_kilometer === 2}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="3"
                        checked={weights.weight_kilometer === 3}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sedang</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="4"
                        checked={weights.weight_kilometer === 4}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="5"
                        checked={weights.weight_kilometer === 5}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sangat Penting</span>
                    </label>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-900">Bobot Status Pajak</span>
                  </label>
                  <div className="flex flex-wrap gap-10 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="1"
                        checked={weights.weight_status_pajak === 1}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sangat Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="2"
                        checked={weights.weight_status_pajak === 2}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="3"
                        checked={weights.weight_status_pajak === 3}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sedang</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="4"
                        checked={weights.weight_status_pajak === 4}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="5"
                        checked={weights.weight_status_pajak === 5}
                        onChange={handleWeightChange}
                        className="radio border-[#2F7B5D] checked:bg-[#2F7B5D] bg-white"
                      />
                      <span className="text-gray-900">Sangat Penting</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn w-full border-none bg-[#2F7B5D] hover:bg-[#266B4F] text-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Cari Motor
            </button>
          </form>

          {/* Search Results */}
          {filteredResults.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hasil Rekomendasi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResults.map((motor, index) => (
                  <div 
                    key={index} 
                    className="bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden border border-[#2F7B5D]/20 hover:border-[#2F7B5D]/50 cursor-pointer"
                    onClick={() => handleMotorClick(motor)}
                  >
                    {/* Image with SAW Score Badge */}
                    <figure className="relative h-48 overflow-hidden">
                      <img
                        src={motor.gambar}
                        alt={motor.motor}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-[#2F7B5D] text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        Score: {motor.saw_score.toFixed(3)}
                      </div>
                      {motor.saw_score === getHighestScore(filteredResults) && (
                        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                          {/* Curved background */}
                          <div className="absolute top-0 left-0 w-28 h-28 bg-[#2F7B5D] rounded-full transform -translate-x-16 -translate-y-16"></div>
                          {/* Star icon */}
                          <div className="absolute top-2 left-2 text-white">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-6 w-6"
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </figure>

                    {/* Content */}
                    <div className="p-4">
                      {/* Brand & Model */}
                      <div className="flex flex-col gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#2F7B5D] bg-[#2F7B5D]/10 px-3 py-1 rounded-full">
                            {motor.brand}
                          </span>
                          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {motor.tahun}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{motor.model}</h3>
                      </div>
                      
                      {/* Price */}
                      <p className="text-xl font-bold text-[#2F7B5D]">
                        Rp {motor.harga.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMotor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Motor Image */}
            <div className="relative h-72">
              <img
                src={selectedMotor.gambar}
                alt={selectedMotor.motor}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Motor Details */}
            <div className="p-6 space-y-6">
              {/* Brand, Model, Year */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2F7B5D] bg-[#2F7B5D]/10 px-3 py-1 rounded-full">
                    {selectedMotor.brand}
                  </span>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {selectedMotor.tahun}
                  </span>
                  <span className="text-sm font-medium text-white bg-[#2F7B5D] px-3 py-1 rounded-full ml-auto">
                    Score: {selectedMotor.saw_score.toFixed(3)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMotor.model}</h2>
              </div>

              {/* Price */}
              <div className="py-3 border-t border-[#2F7B5D]/20">
                <p className="text-3xl font-bold text-[#2F7B5D]">
                  Rp {selectedMotor.harga.toLocaleString()}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-6 py-3 border-t border-[#2F7B5D]/20">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Kilometer</p>
                  <p className="font-medium">{selectedMotor.kilometer.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Status Pajak</p>
                  <p className={`font-medium ${
                    selectedMotor.status_pajak === 'Aktif' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {selectedMotor.status_pajak}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
