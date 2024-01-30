import React, { ReactElement } from 'react';
import Sidebar from '../components/sidebar';
import TopBanner from '../components/topBanner';

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <TopBanner />
      <div className="flex">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
