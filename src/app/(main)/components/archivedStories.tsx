import { Archive, ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getArchivedStories } from '../../actions/storyActions';
import { StoryInterface } from '@/src/interfaces/story';
import StoryDialog from './storyDialog';

function ArchivedStories({ totalArchived }: { totalArchived: number | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [archivedStories, setArchivedStories] = useState<
    StoryInterface[] | null
  >(null);
  const [filter, setFilter] = useState<string | null>('');

  const populateArchived = async () => {
    const data = await getArchivedStories();
    setArchivedStories(data.data);

    return data;
  };

  useEffect(() => {
    populateArchived();
  }, []);

  useEffect(() => {
    if (archivedStories && filter !== null) {
      setArchivedStories(archivedStories.filter((item) => item.id !== filter));
    }
  }, [filter, setFilter]);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 px-4 hover:bg-accent ease-in-out duration-300 w-full text-start flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="">
            <Archive size={16} />
          </span>
          <span className="">Archived</span>
        </div>
        <span
          className={`${isOpen && '-rotate-90'} ease-in-out duration-300 px-1.5`}
        >
          <ChevronLeft size={16} />
        </span>
      </button>
      <div className="">
        {isOpen &&
          archivedStories !== null &&
          archivedStories?.map((item) => (
            <StoryDialog setFilter={setFilter} key={item.id} story={item} />
          ))}
      </div>
    </div>
  );
}

export default ArchivedStories;
