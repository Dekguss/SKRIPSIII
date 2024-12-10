"use client";
import React, { useState } from "react";
import DetailMotor from "../Section/DetailListMotor/DetailMotor";
import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardNav from "../Components/DashboardNav/DashboardNav";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Sidebar />
      <DashboardNav onSearch={handleSearch} />
      <div className="ms-[270px] p-4 min-h-screen">
        <div className="wraper-content">
          <DetailMotor searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
