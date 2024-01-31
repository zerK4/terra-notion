'use client';

import { IconPicker } from '@/src/components/IconPicker';
import React from 'react';
import { updatePageIcon } from '../../actions/storyActions';

function PageIcon({ icon, id }: { icon: any; id: string }) {
  const handleEmojiUpdate = async (e: any, id: string) => {
    await updatePageIcon({ icon: e, pageId: id });
  };
  return (
    <IconPicker asChild onChange={(e) => handleEmojiUpdate(e, id)}>
      <button className="cursor-pointer">
        <span className="text-[5rem]">{icon}</span>
      </button>
    </IconPicker>
  );
}

export default PageIcon;
