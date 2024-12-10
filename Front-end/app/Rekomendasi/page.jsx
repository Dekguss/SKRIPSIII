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

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="flex ms-[270px]">
        <div className="flex-1 p-8 w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Rekomendasi Motor</h1>
            <p className="mt-2 text-gray-600">Temukan motor yang sesuai dengan preferensi Anda</p>
          </div>
          
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-8 rounded-xl border "
          >
            {/* Harga Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Harga Minimum</span>
                </label>
                <input
                  type="text"
                  name="harga_min"
                  value={formattedValues.harga_min}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Rp 0"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Harga Maximum</span>
                </label>
                <input
                  type="text"
                  name="harga_max"
                  value={formattedValues.harga_max}
                  onChange={handleInputChange}
                  className="input input-bordered w-full transition-all  bg-white  duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Rp 1.000.000.000"
                />
              </div>
            </div>

            {/* Kilometer Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kilometer Minimum</span>
                </label>
                <input
                  type="text"
                  name="kilometer_min"
                  value={formattedValues.kilometer_min}
                  onChange={handleInputChange}
                  className="input input-bordered w-full transition-all  bg-white  duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="0"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kilometer Maximum</span>
                </label>
                <input
                  type="text"
                  name="kilometer_max"
                  value={formattedValues.kilometer_max}
                  onChange={handleInputChange}
                  className="input input-bordered w-full transition-all  bg-white  duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="1.000.000"
                />
              </div>
            </div>

            {/* Tahun Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tahun Minimum</span>
                </label>
                <input
                  type="number"
                  name="tahun_min"
                  value={filters.tahun_min}
                  onChange={handleInputChange}
                  className="input input-bordered w-full transition-all  bg-white  duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="2000"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tahun Maximum</span>
                </label>
                <input
                  type="number"
                  name="tahun_max"
                  value={filters.tahun_max}
                  onChange={handleInputChange}
                  className="input input-bordered w-full transition-all  bg-white  duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="2024"
                />
              </div>
            </div>

            {/* Other Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kapasitas Mesin</span>
                </label>
                <select
                  name="kapasitas_mesin"
                  value={filters.kapasitas_mesin}
                  onChange={handleInputChange}
                  className="select select-bordered w-full transition-all bg-white duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                  <span className="label-text">Brand</span>
                </label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleInputChange}
                  className="select select-bordered w-full transition-all bg-white duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                  <span className="label-text">Model</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={filters.model}
                  onChange={handleInputChange}
                  className="input input-bordered w-full transition-all  bg-white  duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Model motor"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status Pajak</span>
                </label>
                <select
                  name="status_pajak"
                  value={filters.status_pajak}
                  onChange={handleInputChange}
                  className="select select-bordered w-full transition-all bg-white duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="Semua">Semua</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak">Tidak Aktif</option>
                </select>
              </div>
            </div>

            {/* Weight Inputs */}
            <div className=" p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">
                Bobot Kriteria
                <span className="text-sm font-normal text-blue-600 ml-2">(Skala Kepentingan)</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Bobot Harga</span>
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="1"
                        checked={weights.weight_harga === 1}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sangat Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="2"
                        checked={weights.weight_harga === 2}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="3"
                        checked={weights.weight_harga === 3}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sedang</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="4"
                        checked={weights.weight_harga === 4}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_harga"
                        value="5"
                        checked={weights.weight_harga === 5}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sangat Penting</span>
                    </label>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Bobot Kilometer</span>
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="1"
                        checked={weights.weight_kilometer === 1}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sangat Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="2"
                        checked={weights.weight_kilometer === 2}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="3"
                        checked={weights.weight_kilometer === 3}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sedang</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="4"
                        checked={weights.weight_kilometer === 4}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_kilometer"
                        value="5"
                        checked={weights.weight_kilometer === 5}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sangat Penting</span>
                    </label>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Bobot Status Pajak</span>
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="1"
                        checked={weights.weight_status_pajak === 1}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sangat Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="2"
                        checked={weights.weight_status_pajak === 2}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Tidak Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="3"
                        checked={weights.weight_status_pajak === 3}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sedang</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="4"
                        checked={weights.weight_status_pajak === 4}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Penting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="weight_status_pajak"
                        value="5"
                        checked={weights.weight_status_pajak === 5}
                        onChange={handleWeightChange}
                        className="radio radio-primary"
                      />
                      <span>Sangat Penting</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn w-full border-none bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow-md"
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
                  <div key={index} className="card bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden border border-gray-100">
                    {motor.gambar && (
                      <figure className="relative h-48 overflow-hidden">
                        <img
                          src={motor.gambar}
                          alt={motor.motor}
                          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                        {motor.saw_score === getHighestScore(filteredResults) && (
                          <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1" title="Rekomendasi Tertinggi">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-6 w-6 text-white"
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          </div>
                        )}
                      </figure>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{motor.motor}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>Tahun {motor.tahun}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>{motor.kilometer.toLocaleString()} km</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          Rp {motor.harga.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            motor.status_pajak === 'Aktif' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {motor.status_pajak}
                          </div>
                          <div className="text-sm text-gray-500">
                            Skor: <span className="font-medium text-blue-600">{motor.saw_score.toFixed(3)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
