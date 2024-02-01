import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { LinkIcon, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getNavStories } from '../../actions/storyActions';
import { NavStories } from '@/src/interfaces/story';
import Link from 'next/link';
import { copy } from '@/src/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';

function SearchComponent() {
  const [search, setSearch] = useState();
  const [stories, setStories] = useState<NavStories[]>();
  const [initialStories, setInitialStories] = useState<NavStories[]>();
  const [regex, setRegex] = useState<RegExp | undefined>(undefined);
  const getAllPages = async () => {
    const { stories } = await getNavStories();

    setStories(stories);
    setInitialStories(stories);
    console.log(stories);
  };

  useEffect(() => {
    getAllPages();
  }, []);

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setRegex(undefined); // Clear the regex when the search input is empty
      setStories(initialStories); // Return to the initial state when the search input is empty
    } else {
      const regex = new RegExp(searchTerm, 'i');
      setRegex(regex);
      if (regex.test('shared')) {
        setStories(
          initialStories!.filter(
            (story) =>
              regex.test(story.title) ||
              story.sharedLink !== null ||
              story.title.toLowerCase().includes('shared')
          )
        );
      } else {
        setStories(
          initialStories!.filter((story) => regex.test(story.title)) // Filter stories based on the new search input value
        );
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 px-4 hover:bg-accent ease-in-out duration-300 w-full text-start flex items-center gap-2">
          <span className="">
            <SearchIcon size={16} />
          </span>
          <span className="">Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-screen md:!min-w-[40rem] border border-primary p-2 flex flex-col justify-start">
        <DialogHeader className="h-fit py-0 my-0">
          <div className="px-1">Search</div>
          <Input
            value={search}
            onChange={(e) => handleSearch(e)}
            placeholder="Search something..."
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border border-accent focus-visible:border-foreground/50 h-12"
          />
        </DialogHeader>
        <div className="h-fit max-h-[50vh] overflow-x-hidden overflow-y-auto">
          {stories?.map(({ icon, id, title, sharedLink }) => (
            <div
              key={id}
              className="px-1 my-1 py-2 flex items-center justify-between hover:bg-secondary ease-in-out duration-300 rounded-md"
            >
              <Link href={`/${id}`} className="flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <span className={``}>
                  {regex !== undefined
                    ? title.split(regex).map((part, index) => (
                        <span key={index} className="text-foreground">
                          {index > 0 && title.match(regex) ? (
                            <span className="bg-yellow-300/30 p-1 rounded-md">
                              {title.match(regex)?.[index - 1]}
                            </span>
                          ) : null}
                          {part}
                        </span>
                      ))
                    : title}
                </span>
              </Link>
              {sharedLink !== null && (
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => copy(sharedLink as string)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-accent rounded-md"
                        >
                          <LinkIcon size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="border border-primary">
                        <p>Copy shareable link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/shared/${sharedLink}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-foreground h-8 px-2 flex items-center justify-center hover:bg-accent rounded-md"
                        >
                          Shared
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="border border-primary">
                        <p>Open the shared link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchComponent;
