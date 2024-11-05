// src/app/dashboard/index.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@mui/material';
import Sidebar from '@/components/dashboard/sidebar';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      {/* O resto do conteúdo do seu dashboard vai aqui */}
    </div>
  );
};

export default DashboardPage;
