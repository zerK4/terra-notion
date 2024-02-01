import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal, PlusCircle, Trash } from 'lucide-react';
import React from 'react';
import { removePage } from '../../actions/storyActions';
import { useRouter } from 'next/navigation';

function StoryDropMenu({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const data = await removePage(id);

    router.push(data.redirect);

    console.log(data, 'tjis is data');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="group-hover/story:opacity-100 opacity-0 h-6 w-6 rounded-md flex items-center justify-center hover:bg-primary ease-in-out duration-300">
          <MoreHorizontal size={14} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-background shadow border border-accent text-sm">
        <DropdownMenuItem className="flex items-center">
          <button
            onClick={handleDelete}
            className="w-full gap-2 flex items-center hover:bg-primary px-2 py-1 rounded-md"
          >
            <span className="">
              <Trash size={14} />
            </span>
            <span className="">Delete</span>
          </button>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="flex items-center">
          <button className="w-full gap-2 flex items-center hover:bg-primary px-2 py-1 rounded-md">
            <span className="">
              <PlusCircle size={14} />
            </span>
            <span className="">Add new</span>
          </button>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StoryDropMenu;
