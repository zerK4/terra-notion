import { PlusCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { currentUser } from '@clerk/nextjs';
import { createStory, getNavStories } from './actions/storyActions';
import CreateButton from '../components/createButton';
import Link from 'next/link';

const DocumentsPage = async () => {
  const user = await currentUser();
  const { stories } = await getNavStories();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-screen">
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      {stories.length !== 0 && (
        <Link href={`/${stories[0].id}`}>{stories[0].title}</Link>
      )}
      <CreateButton />
    </div>
  );
};

export default DocumentsPage;
