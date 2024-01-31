'use client';

import { Spinner } from '@/src/components/Spinner';
import { getSaveDate } from '@/src/lib/utils';
import { editorStore } from '@/src/store/editor';
import { pageStore } from '@/src/store/page';
import { sidebarStore } from '@/src/store/sidebar';
import { CheckCircle2, ChevronsRight, LinkIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import ShareDialog from './shareDialog';
import { toast } from 'sonner';

function TopBanner() {
  const { isClosed } = sidebarStore();
  const { saveDate, saved, isSaving } = editorStore();
  const { pageName, pageId, sharedLink } = pageStore();

  const handleCopyLink = () => {
    const copy = `${window.location.origin}/shared/${sharedLink}`;
    navigator.clipboard.writeText(copy);
    toast('Copied to clipboard', {
      description: `${copy}`,
    });
  };

  return (
    <div className="w-screen h-10 bg-primary px-4 flex items-center justify-between fixed top-0 left-0 z-[9999]">
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
        <div className="opacity-50 whitespace-nowrap max-w-[7rem] md:max-w-[fit-content] overflow-hidden">
          {pageName}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isSaving ? (
          <Spinner />
        ) : saved ? (
          <CheckCircle2 size={18} className="text-lime-400" />
        ) : null}
        <span className="text-sm">Edited {getSaveDate(saveDate)}</span>
        <div className="flex items-center gap-1">
          {sharedLink !== null ? (
            <button
              onClick={handleCopyLink}
              className="h-6 w-6 flex items-center justify-center hover:bg-accent ease-in-out duration-300 rounded-sm"
            >
              <LinkIcon size={14} />
            </button>
          ) : (
            <ShareDialog pageId={pageId} pageTitle={pageName} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
