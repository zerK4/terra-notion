import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { StoryInterface } from '@/src/interfaces/story';
import React, { MouseEvent } from 'react';
import TextEditor from '@/src/components/editor';
import { ArchiveRestore, Trash } from 'lucide-react';
import { removeArchived, unarchiveStory } from '../../actions/storyActions';
import { toast } from 'sonner';

function StoryDialog({
  story,
  setFilter,
}: {
  story: StoryInterface;
  setFilter: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const handleUnarchive = async () => {
    await unarchiveStory(story.id);
    setFilter(story.id);
  };

  const handleRemove = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const promise = removeArchived(story.id);
    setFilter(story.id);

    toast.promise(promise, {
      loading: 'Removing...',
      success: (data) => {
        return `Removed.`;
      },
      error: 'An error occurred!',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-2 flex items-center justify-between">
          <button
            className={`pl-10 pr-4 py-0.5 hover:bg-accent w-full text-left flex items-center justify-between ease-in-out duration-300`}
          >
            {story.name}
          </button>
          <button
            onClick={(e) => handleRemove(e)}
            className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-red-500"
          >
            <Trash size={14} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="border border-primary !min-w-[70vw] h-[70vh] overflow-x-hidden overflow-y-auto flex flex-col gap-1 p-0">
        <div className="h-12 flex items-center px-2">
          <button
            onClick={handleUnarchive}
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-accent"
          >
            <ArchiveRestore size={20} />
          </button>
        </div>
        <TextEditor
          editable={false}
          sharedLink={story.id}
          id={story.id}
          content={story.json}
          name={story.name}
          updated={parseFloat(story.updated_at as string)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default StoryDialog;
