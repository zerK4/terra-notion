import { IconPicker } from '@/src/components/IconPicker';
import { NavStories } from '@/src/interfaces/story';
import { FileTextIcon, MoreHorizontal, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { updatePageIcon } from '../../actions/storyActions';
import { usePathname } from 'next/navigation';
import StoryDropMenu from './storyDropMenu';

function Stories({ stories }: { stories?: NavStories[] }) {
  const pathName = usePathname();
  const handleEmojiUpdate = async (e: any, id: string) => {
    await updatePageIcon({ icon: e, pageId: id });
  };

  return (
    <div className="w-full overflow-hidden mt-1 flex flex-col gap-1">
      {stories !== undefined &&
        stories.length !== 0 &&
        stories?.map(({ id, title, icon }) => (
          <Link
            key={id}
            href={`/${id}`}
            className={`${pathName === `/${id}` && 'bg-accent'} group/story px-2 pl-10 pr-4 py-0.5 hover:bg-accent w-full text-left flex items-center justify-between ease-in-out duration-300 rounded-md`}
          >
            <button className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Link href={'#'}>
                  <IconPicker
                    asChild
                    onChange={(e) => {
                      handleEmojiUpdate(e, id);
                    }}
                  >
                    <span className="hover:bg-primary h-8 w-8 rounded-sm flex items-center justify-center">
                      {icon === null ? (
                        <FileTextIcon size={14} />
                      ) : (
                        <span className="">{icon}</span>
                      )}
                    </span>
                  </IconPicker>
                </Link>
                <span>{title}</span>
              </div>
              <StoryDropMenu id={id} />
            </button>
          </Link>
        ))}
    </div>
  );
}

export default Stories;
