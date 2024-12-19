"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [popularMotors, setPopularMotors] = useState([]);

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const response = await fetch('http://localhost:5000/motors');
        const data = await response.json();
        // Get 4 random motors for the popular section
        const randomMotors = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setPopularMotors(randomMotors);
      } catch (error) {
        console.error('Error fetching motors:', error);
      }
    };

    fetchMotors();
  }, []);

  const handleStartSearch = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login');
    } else {
      router.push('/Rekomendasi');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#2F7B5D]">MOTOREC</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-[#2F7B5D]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/Login">
              <button className="px-6 py-2 text-sm font-medium text-[#2F7B5D] bg-transparent hover:bg-[#2F7B5D] hover:text-white rounded-full transition">
                Masuk
              </button>
            </Link>
            <Link href="/Register">
              <button className="px-6 py-2 text-sm font-medium text-white bg-[#2F7B5D] hover:bg-[#266B51] rounded-full transition">
                Daftar
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left md:w-1/2"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2F7B5D] mb-6">
              Temukan Motor Bekas <br /> Impian Anda
            </h1>
            <button 
              onClick={handleStartSearch}
              className="px-8 py-3 bg-[#2F7B5D] text-white rounded-full hover:bg-[#266B51] transition transform hover:scale-105"
            >
              Mulai Mencari
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:w-1/2"
          >
            <img
              src="Hero.png"
              alt="Motorcycle"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden h-64 group bg-[#2F7B5D]"
          >
            <img
              src="Hero.png"
              alt="Sport"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F7B5D]/60 to-[#2F7B5D]/10">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Motor Sport</h3>
                <p className="text-sm text-white/80">Performa Maksimal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden h-64 group bg-[#2F7B5D]"
          >
            <img
              src="/images/matic.jpg"
              alt="Matic"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F7B5D]/60 to-[#2F7B5D]/10">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Motor Matic</h3>
                <p className="text-sm text-white/80">Nyaman & Praktis</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden h-64 group bg-[#2F7B5D]"
          >
            <img
              src="/images/bebek.jpg"
              alt="Bebek"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F7B5D]/60 to-[#2F7B5D]/10">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Motor Bebek</h3>
                <p className="text-sm text-white/80">Handal & Ekonomis</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Motorcycles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#2F7B5D] mb-8">Motor Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {popularMotors.map((motor) => (
              <motion.div
                key={motor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#2F7B5D]/20"
              >
                <div className="relative h-48">
                  <img
                    src={motor.gambar || `/images/motor1.jpg`}
                    alt={`${motor.brand} ${motor.model}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#2F7B5D] text-white px-3 py-1 rounded-full text-sm">
                    Populer
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2F7B5D] mb-2">{motor.brand} {motor.model}</h3>
                  <p className="text-gray-600 text-sm mb-4">{motor.tahun} • {motor.kilometer.toLocaleString()} km</p>
                  <p className="text-[#2F7B5D] font-bold">Rp {motor.harga.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              2024 MOTOREC. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-600 hover:text-[#2F7B5D] transition">
                Tentang Kami
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#2F7B5D] transition">
                Bantuan
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#2F7B5D] transition">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}