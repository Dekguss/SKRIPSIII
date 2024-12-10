import React, { useState } from "react";

export default function Card({ brand, gambar, harga, model, tahun }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (imageError) {
    return null;
  }

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={gambar}
          alt={model}
          className={`w-full h-full object-cover transform transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={() => setImageError(true)}
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full shadow-sm">
            {tahun}
          </span>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {brand}
          </span>
        </div>

        {/* Model Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {model}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Starting from</span>
            <span className="text-lg font-bold text-blue-600">
              Rp {harga.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
