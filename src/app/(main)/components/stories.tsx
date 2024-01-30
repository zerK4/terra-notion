import { PlusIcon } from 'lucide-react';
import React from 'react';

export interface NavStoriesInterface {
  id: string;
  title: string;
  icon: any;
}

function Stories({ stories }: { stories?: NavStoriesInterface[] }) {
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
              <span className="">{icon}</span>
              <span className="">{title}</span>
            </div>
            <button className="group-hover/story:opacity-100 opacity-0 h-6 w-6 rounded-md flex items-center justify-center hover:bg-primary ease-in-out duration-300">
              <PlusIcon size={14} />
            </button>
          </button>
        ))}
    </div>
  );
}

export default Stories;
