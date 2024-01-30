'use client';

import { IconPicker } from '@/src/components/IconPicker';
import React from 'react';
import { updatePageIcon } from '../../actions/storyActions';
import { FileTextIcon } from 'lucide-react';

function PageIcon({ icon, id }: { icon: any; id: string }) {
  const handleEmojiUpdate = async (e: any, id: string) => {
    await updatePageIcon({ icon: e, pageId: id });
  };
  return (
    <IconPicker asChild onChange={(e) => handleEmojiUpdate(e, id)}>
      <span className="cursor-pointer rounded-md flex items-center justify-center absolute -top-16 text-[5rem]">
        {icon === null ? (
          <FileTextIcon size={14} />
        ) : (
          <span className="">{icon}</span>
        )}
      </span>
    </IconPicker>
  );
}

export default PageIcon;
