import React, { ReactElement } from 'react';
import Sidebar from '../components/sidebar';
import TopBanner from '../components/topBanner';
import { Toaster } from '@/src/components/ui/sonner';
import { getNavStories } from '../../actions/storyActions';

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { stories } = await getNavStories();

  return (
    <div className="flex flex-col">
      <TopBanner />
      <div className="flex">
        <Sidebar stories={JSON.stringify(stories)} />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
