'use client';

import { sidebarStore } from '@/src/store/sidebar';
import { ChevronRight, PlusIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { UserComponent } from './userComponent';
import { Separator } from '@/src/components/ui/separator';
import Stories from './stories';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname, useRouter } from 'next/navigation';
import { NavStories } from '@/src/interfaces/story';
import { sidebarMenu } from '@/src/menus/sidebar';

function Sidebar({ stories }: { stories: string }) {
  const { isClosed, tempShow } = sidebarStore();
  const [showStories, setShowStories] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [myStories, setMyStories] = useState<NavStories[]>();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setMyStories(JSON.parse(stories));
  }, [stories]);

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
    <div className={`relative ${isClosed ? 'w-0' : 'w-72'}`}>
      {isClosed && (
        <div
          onMouseEnter={() =>
            !isMobile && sidebarStore.setState({ tempShow: true })
          }
          onMouseLeave={() =>
            !isMobile && sidebarStore.setState({ tempShow: false })
          }
          className="h-screen w-32 bg-transparent fixed top-8 left-0"
        />
      )}
      <aside
        onMouseOver={() =>
          isClosed && !isMobile && sidebarStore.setState({ tempShow: true })
        }
        onMouseLeave={() =>
          isClosed && !isMobile && sidebarStore.setState({ tempShow: false })
        }
        className={`${isClosed ? '-translate-x-[100vw]' : ''} ${tempShow ? '!h-64 left-0 translate-x-0' : ''} fixed top-10 ease-in-out duration-300 z-[50] group/sidebar left-0 min-h-screen bg-primary w-64 flex flex-col`}
      >
        <UserComponent />
        <div className="w-full flex flex-col gap-0.5 items-start">
          {sidebarMenu.map(({ name, icon, action }) => (
            <button
              className="p-1 px-4 hover:bg-accent ease-in-out duration-300 w-full text-start flex items-center gap-2"
              key={name}
              onClick={(e) => action(e, router)}
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
