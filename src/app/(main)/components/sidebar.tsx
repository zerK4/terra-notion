'use client';

import { sidebarStore } from '@/src/store/sidebar';
import { ChevronRight, PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { UserComponent } from './userComponent';
import { Separator } from '@/src/components/ui/separator';
import { getNavStories } from '../../actions/storyActions';
import Stories, { NavStoriesInterface } from './stories';
import { useMediaQuery } from 'usehooks-ts';

const sidebarMenu = [
  {
    name: 'Search',
    icon: <SearchIcon size={16} />,
    action: (e: any) => console.log(e),
  },
  {
    name: 'Settings',
    icon: <SettingsIcon size={16} />,
    action: (e: any) => console.log(e),
  },
  {
    name: 'New story',
    icon: <PlusIcon size={16} />,
    action: (e: any) => console.log(e),
  },
];

function Sidebar() {
  const { isClosed } = sidebarStore();
  const [showStories, setShowStories] = useState<boolean>();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [myStories, setMyStories] = useState<NavStoriesInterface[]>();

  useEffect(() => {
    getNavStories()
      .then((res) => {
        console.log(res, 'this is the response');
        setMyStories(res.stories);
      })
      .catch((err) => {
        console.log(err, 'this is the error');
      });
  }, []);

  useEffect(() => {
    if (isMobile) {
      sidebarStore.setState({
        isClosed: true,
      });
    } else {
      sidebarStore.setState({
        isClosed: false,
      });
    }
  }, [isMobile]);

  return (
    <div className={` relative ${isClosed ? 'w-0' : 'w-64'}`}>
      <aside
        className={`${isClosed ? '-translate-x-[100vw]' : ''} fixed top-8 ease-in-out duration-300 z-[9999] group/sidebar left-0 min-h-screen bg-primary w-64 flex flex-col`}
      >
        <UserComponent />
        <div className="w-full flex flex-col gap-0.5 items-start">
          {sidebarMenu.map(({ name, icon, action }) => (
            <button
              className="p-1 px-4 hover:bg-accent ease-in-out duration-300 w-full text-start flex items-center gap-2"
              key={name}
              onClick={(e) => action(e)}
            >
              <span className="">{icon}</span>
              <span className="">{name}</span>
            </button>
          ))}
          <Separator className="my-2" />
          <div className="w-full">
            <button
              onClick={() => setShowStories(!showStories)}
              className="px-4 py-1 hover:bg-accent ease-in-out duration-300 w-full text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="ease-in-out duration-300">
                  <ChevronRight
                    size={14}
                    className={`${showStories ? 'rotate-90' : ''} ease-in-out duration-300`}
                  />
                </span>
                <span className="">My Stories</span>
              </div>
              <span className="h-6 w-6 rounded-md hover:bg-primary ease-in-out duration-300 flex items-center justify-center">
                <PlusIcon size={16} />
              </span>
            </button>
            {showStories && <Stories stories={myStories} />}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
