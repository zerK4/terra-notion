import { IconPicker } from '@/src/components/IconPicker';
import { NavStories } from '@/src/interfaces/story';
import { FileTextIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { updatePageIcon } from '../../actions/storyActions';

function Stories({ stories }: { stories?: NavStories[] }) {
  const handleEmojiUpdate = async (e: any, id: string) => {
    const icon = await updatePageIcon({ icon: e, pageId: id });
  };
  return (
    <div className="w-full overflow-hidden mt-1 flex flex-col gap-1">
      {stories !== undefined &&
        stories.length !== 0 &&
        stories?.map(({ id, title, icon }) => (
          <button
            key={id}
            className="group/story px-2 pl-10 pr-4 py-0.5 hover:bg-accent w-full text-left flex items-center justify-between ease-in-out duration-300"
          >
            <div className="flex items-center gap-2">
              <IconPicker asChild onChange={(e) => handleEmojiUpdate(e, id)}>
                <span className="hover:bg-primary h-8 w-8 rounded-sm flex items-center justify-center">
                  {icon === null ? (
                    <FileTextIcon size={14} />
                  ) : (
                    <span className="">{icon}</span>
                  )}
                </span>
              </IconPicker>
              <Link
                href={`/${id}`}
                className="whitespace-nowrap overflow-hidden max-w-[8rem]"
              >
                <span>{title}</span>
              </Link>
            </div>
            <span className="group-hover/story:opacity-100 opacity-0 h-6 w-6 rounded-md flex items-center justify-center hover:bg-primary ease-in-out duration-300">
              <PlusIcon size={14} />
            </span>
          </button>
        ))}
    </div>
  );
}

export default Stories;
