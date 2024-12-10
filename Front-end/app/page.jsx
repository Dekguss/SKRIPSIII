"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">MOTOREC</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-400"
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
              <button className="px-6 py-2 text-sm font-medium text-white bg-transparent hover:bg-blue-800 rounded-full transition">
                Masuk
              </button>
            </Link>
            <Link href="/Register">
              <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition">
                Daftar
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Temukan Motor Bekas <br /> Impian Anda
          </h1>
          <Link href="/Rekomendasi">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-105">
              Mulai Mencari
            </button>
          </Link>
        </motion.div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden h-64 group"
          >
            <img
              src="/images/sport.jpg"
              alt="Sport"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Motor Sport</h3>
                <p className="text-sm text-gray-200">Performa Maksimal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden h-64 group"
          >
            <img
              src="/images/matic.jpg"
              alt="Matic"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Motor Matic</h3>
                <p className="text-sm text-gray-200">Nyaman & Praktis</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden h-64 group"
          >
            <img
              src="/images/bebek.jpg"
              alt="Bebek"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Motor Bebek</h3>
                <p className="text-sm text-gray-200">Handal & Ekonomis</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Motorcycles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Motor Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * item }}
                className="bg-blue-900/50 rounded-3xl overflow-hidden group"
              >
                <div className="relative h-48">
                  <img
                    src={`/images/motor${item}.jpg`}
                    alt={`Motor ${item}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    Populer
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Honda CBR 250RR</h3>
                  <p className="text-gray-300 text-sm mb-4">2021 • 5.000 km</p>
                  <p className="text-blue-400 font-bold">Rp 55.000.000</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-blue-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 MOTOREC. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Tentang Kami
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Bantuan
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}