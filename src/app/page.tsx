import { getNavStories } from './actions/storyActions';
import CreateButton from '../components/createButton';
import Link from 'next/link';
import NoAcctounView from '../components/noAccountView';
import { getSession } from './actions/authActions';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { redirect } from 'next/navigation';

const DocumentsPage = async () => {
  const { user } = await getSession();

  if (!user) {
    return <NoAcctounView />;
  }

  const [currentUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id));

  const { stories } = await getNavStories();

  if (stories.length > 0) {
    redirect(`/${stories[0].id}`);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-screen">
      <h2 className="text-lg font-medium">Welcome {currentUser?.name}</h2>
      {stories.length !== 0 && (
        <Link href={`/${stories[0].id}`}>{stories[0].title}</Link>
      )}
      <CreateButton />
    </div>
  );
};

export default DocumentsPage;
