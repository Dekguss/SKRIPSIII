"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function DashboardNav({ onSearch }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          localStorage.removeItem('token'); // Clear any invalid token
          return;
        }

        const response = await fetch('http://localhost:5000/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email
        });
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        localStorage.removeItem('token');
        router.push('/Login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchUser();
  }, [router]);


  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="ms-[270px] border-b-[1px] border-gray-200 p-4">
      <div className="wraper-nav flex justify-between items-center">
        <div className="relative w-fit">
          <input
            type="search"
            placeholder="Search Your Vehicle Here"
            className="px-4 text-sm py-3 rounded-full bg-transparent border focus:outline-none w-[500px] border-gray-300"
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#4b5563"
            className="size-6 absolute top-3 right-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <div className="w-fit  border bg-gray-50 rounded-lg px-5 py-3 flex items-center gap-4">
          {loading ? (
            <p className="text-sm">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <>
              <div>
                <h1 className="text-sm font-bold">{userData.username}</h1>
                <p className="text-sm">{userData.email}</p>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
