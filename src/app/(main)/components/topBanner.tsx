'use client';

import { sidebarStore } from '@/src/store/sidebar';
import { ChevronsRight } from 'lucide-react';
import React from 'react';

function TopBanner() {
  const { isClosed } = sidebarStore();
  return (
    <div className="w-screen h-8 bg-primary px-4 flex items-center">
      <div className="flex items-center gap-2">
        {isClosed && (
          <button
            onClick={() =>
              sidebarStore.setState({
                isClosed: !isClosed,
              })
            }
            className="h-7 w-7 flex items-center justify-center hover:bg-accent rounded-md ease-in-out duration-300"
          >
            <ChevronsRight className="" />
          </button>
        )}
        <div className="opacity-50">Page title</div>
      </div>
    </div>
  );
}

export default TopBanner;
