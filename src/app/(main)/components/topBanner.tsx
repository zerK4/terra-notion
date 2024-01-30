'use client';

import { Spinner } from '@/src/components/Spinner';
import { getSaveDate } from '@/src/lib/utils';
import { editorStore } from '@/src/store/editor';
import { sidebarStore } from '@/src/store/sidebar';
import { CheckCircle2, ChevronsRight } from 'lucide-react';
import React from 'react';

function TopBanner() {
  const { isClosed } = sidebarStore();
  const { saveDate, saved, isSaving } = editorStore();

  return (
    <div className="w-screen h-8 bg-primary px-4 flex items-center justify-between">
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
      <div className="flex items-center gap-4">
        <span className="text-sm">Edited {getSaveDate(saveDate)}</span>
        {isSaving ? (
          <Spinner />
        ) : saved ? (
          <CheckCircle2 size={18} className="text-lime-400" />
        ) : null}
        <span className="">Share</span>
      </div>
    </div>
  );
}

export default TopBanner;
