import { currentUser } from '@clerk/nextjs';
import { getNavStories } from './actions/storyActions';
import CreateButton from '../components/createButton';
import Link from 'next/link';
import NoAcctounView from '../components/noAccountView';

const DocumentsPage = async () => {
  const user = await currentUser();
  const { stories } = await getNavStories();

  if (!user) {
    return (
      <div className="w-screen">
        <NoAcctounView />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-screen">
      <h2 className="text-lg font-medium">Welcome {user?.firstName}</h2>
      {stories.length !== 0 && (
        <Link href={`/${stories[0].id}`}>{stories[0].title}</Link>
      )}
      <CreateButton />
    </div>
  );
};

export default DocumentsPage;
